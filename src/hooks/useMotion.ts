import { useLayoutEffect } from 'react';

export function useMotion() {
  useLayoutEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (media.matches) {
        document.documentElement.classList.remove('motion-ready');
        return;
      }
      document.documentElement.classList.add('motion-ready');
      const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
      reveals.forEach(el => observer.observe(el));
      const story = document.querySelector<HTMLElement>('.hero-story');
      const sticky = document.querySelector<HTMLElement>('.hero-sticky');
      const grid = document.querySelector<HTMLElement>('.story-grid');
      const photoFrame = document.querySelector<HTMLElement>('.hero-frame');
      const storyPanel = document.querySelector<HTMLElement>('.story-copy');
      const heroControls = [...document.querySelectorAll<HTMLElement>('.hero-content, .hero-bottom')];
      const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
      let frame = 0;
      let heroTop = 0;
      let heroTravel = 1;
      let previousProgress = -1;
      let geometry = { x: 0, y: 0, sx: 1, sy: 1 };
      const measure = () => {
        if (story && sticky && grid && photoFrame) {
          heroTop = story.getBoundingClientRect().top + window.scrollY;
          heroTravel = Math.max(1, story.offsetHeight - sticky.offsetHeight);
          // Untransformed grid metrics: measured only when layout changes.
          geometry = {
            x: grid.offsetLeft + photoFrame.offsetLeft,
            y: grid.offsetTop + photoFrame.offsetTop,
            sx: sticky.clientWidth / Math.max(1, photoFrame.offsetWidth),
            sy: sticky.clientHeight / Math.max(1, photoFrame.offsetHeight),
          };
          photoFrame.style.setProperty('--scene-width', `${sticky.clientWidth}px`);
          photoFrame.style.setProperty('--scene-height', `${sticky.clientHeight}px`);
          previousProgress = -1;
        }
        schedule();
      };
      const update = () => {
        frame = 0;
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        // Batch all layout reads before writing any animated style.
        const positions = parallax.map(el => ({ el, rect: el.getBoundingClientRect() }));
        const p = Math.min(1, Math.max(0, (scrollY - heroTop) / heroTravel));
        if (p !== previousProgress) {
          previousProgress = p;
          const ease = (start: number, end: number) => {
            const t = Math.min(1, Math.max(0, (p - start) / (end - start)));
            return (t * t * (3 - 2 * t)).toFixed(4);
          };
          const t = Math.min(1, p / .9);
          const panel = t * (2 - t);
          const remaining = 1 - panel;
          const sx = 1 + (geometry.sx - 1) * remaining;
          const sy = 1 + (geometry.sy - 1) * remaining;
          const uniform = Math.max(sx, sy);
          const values = {
            '--frame-x': `${-geometry.x * remaining}px`,
            '--frame-y': `${-geometry.y * remaining}px`,
            '--frame-sx': String(sx), '--frame-sy': String(sy),
            '--visual-sx': String(1 / sx), '--visual-sy': String(1 / sy),
            // Counter-scale the image so the changing frame never stretches it.
            '--image-sx': String(uniform / sx), '--image-sy': String(uniform / sy),
            '--frame-radius': `${14 * panel}px`,
          };
          Object.entries(values).forEach(([key, value]) => photoFrame?.style.setProperty(key, value));
          story?.style.setProperty('--progress', p.toFixed(4));
          story?.style.setProperty('--panel', panel.toFixed(4));
          story?.style.setProperty('--crossfade', ease(0, .46));
          story?.style.setProperty('--copy', ease(.22, .64));
          story?.style.setProperty('--exit', ease(0, .3));
          story?.style.setProperty('--details', ease(.44, .8));
          if (storyPanel && storyPanel.inert !== (p < .8)) storyPanel.inert = p < .8;
          heroControls.forEach(el => { if (el.inert !== (p > .3)) el.inert = p > .3; });
        }
        positions.forEach(({ el, rect }) => {
          if (rect.bottom < 0 || rect.top > viewportHeight) return;
          const value = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
          el.style.setProperty('--drift', `${(value * Number(el.dataset.parallax)).toFixed(2)}px`);
        });
      };
      function schedule() { if (!frame) frame = requestAnimationFrame(update); }
      measure();
      // Initialize before paint, then keep one rAF for native scroll updates.
      cancelAnimationFrame(frame);
      update();
      const resizeObserver = new ResizeObserver(measure);
      if (grid) resizeObserver.observe(grid);
      if (storyPanel) resizeObserver.observe(storyPanel);
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', measure, { passive: true });
      cleanup = () => {
        observer.disconnect();
        resizeObserver.disconnect();
        photoFrame?.removeAttribute('style');
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', measure);
        cancelAnimationFrame(frame);
        ['--progress', '--panel', '--crossfade', '--copy', '--exit', '--details'].forEach(name => story?.style.removeProperty(name));
        heroControls.forEach(el => { el.inert = false; });
        if (storyPanel) storyPanel.inert = true;
        parallax.forEach(el => el.style.removeProperty('--drift'));
      };
    };
    setup();
    media.addEventListener('change', setup);
    return () => { cleanup(); media.removeEventListener('change', setup); document.documentElement.classList.remove('motion-ready'); };
  }, []);
}
