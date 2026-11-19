const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? '×' : '☰';
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

const sections = [...document.querySelectorAll('main section[id], header[id]')];
const navObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`,
          );
        });
      }
    }),
  { rootMargin: '-35% 0px -55% 0px' },
);

sections.forEach((section) => {
  navObserver.observe(section);
});
