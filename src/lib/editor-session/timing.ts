export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Erro usado para interromper uma sequência (ex.: ao clicar em "Rever montagem"). */
export class SequenceCancelled extends Error {
  constructor() {
    super('sequence cancelled');
  }
}

/**
 * Controla o cancelamento: cada execução recebe um "token" e,
 * se outra execução começar, as anteriores param no próximo passo.
 */
export class Timeline {
  private generation = 0;

  next() {
    this.generation += 1;
    return this.generation;
  }

  assert(token: number) {
    if (token !== this.generation) throw new SequenceCancelled();
  }

  wait(ms: number, token: number) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          this.assert(token);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, ms);
    });
  }

  tween(duration: number, token: number, onFrame: (eased: number, progress: number) => void) {
    return new Promise<void>((resolve, reject) => {
      const start = performance.now();
      const step = (now: number) => {
        try {
          this.assert(token);
        } catch (error) {
          reject(error);
          return;
        }
        const progress = Math.min(1, (now - start) / duration);
        onFrame(easeInOutCubic(progress), progress);
        if (progress < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  }
}
