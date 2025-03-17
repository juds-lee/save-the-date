export const useFadeUpAnimation = () => {
  const initFadeUpAnimation = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-active");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up-element").forEach((element) => {
      observer.observe(element);
    });

    return observer;
  };

  return {
    initFadeUpAnimation,
  };
};
