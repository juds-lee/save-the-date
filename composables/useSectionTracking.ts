export function useSectionTracking() {
  const activeSection = ref("");

  const updateActiveSection = () => {
    const sections = document.querySelectorAll("[id]");
    const scrollPosition = window.scrollY + 100;
    // Find the section that is currently in view based on scroll position
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionBottom = sectionTop + section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSection.value = section.id;
      }
    });
  };

  onMounted(() => {
    window.addEventListener("scroll", updateActiveSection);
    updateActiveSection();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", updateActiveSection);
  });

  return { activeSection };
}
