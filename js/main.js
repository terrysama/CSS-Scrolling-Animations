(function () {
  const nav = document.querySelector(".my-nav");
  const hero = document.querySelector("#hero");
  const headerCue = document.querySelector(".header-cue");
  const meetMonsters = document.querySelector("#meet");
  const monsterImg = document.querySelectorAll(".monster");
  const navHeight = nav.scrollHeight;

  // Intersection observer to change navbar background upon page scroll
  const navOptions = {
    threshold: 0,
    rootMargin: -navHeight - 20 + "px",
  };

  const navScrollObserver = new IntersectionObserver((entries) => {
    !entries[0].isIntersecting
      ? nav.classList.add("scrolled")
      : nav.classList.remove("scrolled");
  }, navOptions);

  navScrollObserver.observe(hero);

  // let currentCuePosition = headerContent.getBoundingClientRect().top;

  // Intersection observer to display/remove the Cue icon when page is scrolled
  const cueOptions = {
    threshold: 0,
    rootMargin: "-70px",
  };

  const cuePositionObserver = new IntersectionObserver((entries) => {
    entries[0].isIntersecting
      ? headerCue.classList.add("d-none")
      : headerCue.classList.remove("d-none");
  }, cueOptions);

  cuePositionObserver.observe(meetMonsters);

  function inViewPort(el) {
    let rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.top <= window.innerHeight && rect.bottom >= window.innerHeight) ||
      (rect.top >= 0 && rect.bottom <= window.innerHeight)
    );
  }

  monsterImg.forEach((monster) => {
    monster.style.animationDelay = `${Math.random() * 0.7 + 0.3}s`;
  });

  const moveHeader = () => {
    monsterImg.forEach((monster) => {
      inViewPort(monster)
        ? monster.classList.add("appear")
        : monster.classList.remove("appear");
    });

    window.requestAnimationFrame(moveHeader);
  };

  window.requestAnimationFrame(moveHeader);

  const controller = new ScrollMagic.Controller();

  let friendTextTween = TweenMax.from(".friend-text", {
    y: 300,
    opacity: 0,
    // duration: 2,   // in secs
    // ease: "elastic.out(1, 0.4)",
  });

  new ScrollMagic.Scene({
    triggerElement: "#friend",
    // offset: 50,
    duration: "136.5%",
    triggerHook: 0,
  })
    .setTween(friendTextTween)
    .setPin("#friend")
    .addTo(controller);

  // Parachute Tween
  let tween = new TimelineMax();

  let parachuteTween = tween
    .from("#parachute", {
      opacity: 0.3,
      scale: 0.2,
      rotate: -40,
      x: "30vw",
      y: "-60vh",
    })
    .to("#parachute", {
      x: "6vw",
      y: "7vh",
      rotate: -25,
      transition: "ease-out",
    })
    .to("#parachute", {
      x: "-6vw",
      y: "100vh",
      rotate: 15,
      scale: 0.6,
      transition: "ease-in",
    });

  let parachuteFloatScene = new ScrollMagic.Scene({
    triggerElement: "#friend",
    offset: 40,
    duration: "345%",
    triggerHook: 1,
  })
    .setTween(parachuteTween)
    .addTo(controller);

  let typesTween = new TimelineMax();

  typesTween.from("#types .col", {
    scale: 0.5,
    opacity: 0,
    stagger: 1,
  });

  new ScrollMagic.Scene({
    triggerElement: "#types",
    offset: -50,
    triggerHook: 0,
    duration: 300,
  })
    .setPin("#types")
    .setTween(typesTween)
    .addTo(controller);
})(); // IIFE for when page loads
