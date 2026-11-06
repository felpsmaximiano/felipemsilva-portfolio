import { applyOffset, clearOffset, docBox, readOffset, type Box } from './geometry';
import { EditorOverlay } from './overlay';
import { editorState, setTyped, type EditorTool } from './state';
import { SequenceCancelled, Timeline } from './timing';

/**
 * Elementos que participam da animação são marcados no JSX com `data-edit="<papel>"`.
 * O motor só lê o DOM, então os componentes continuam simples e testáveis.
 */
const q = <T extends HTMLElement = HTMLElement>(role: string) =>
  document.querySelector<T>(`[data-edit="${role}"]`);

const GRAY = '#2a2f45';
const COBALT = '#2340e0';
const FILL_COLORS = [GRAY, COBALT, '#f3f2ef', '#0d0d0f'];

export interface EditorSessionOptions {
  userName: string;
  reducedMotion: boolean;
}

export function createEditorSession({ userName, reducedMotion }: EditorSessionOptions) {
  const timeline = new Timeline();
  let overlay: EditorOverlay | null = null;
  let queue: Promise<void> = Promise.resolve();
  let observer: IntersectionObserver | null = null;

  const setTool = (tool: EditorTool) => editorState.set((s) => ({ ...s, tool }));
  const setBusy = (busy: boolean) =>
    editorState.set((s) => ({ ...s, idle: !busy, status: busy ? 'editing' : 'published' }));

  /** Executa as sequências uma de cada vez, na ordem em que foram pedidas. */
  function enqueue(task: (token: number) => Promise<void>, token: number) {
    queue = queue
      .then(() => task(token))
      .catch((error) => {
        if (!(error instanceof SequenceCancelled)) console.error(error);
      });
    return queue;
  }

  function ensureOverlay() {
    overlay ??= new EditorOverlay(timeline, userName);
    return overlay;
  }

  /** Arrasta (ou redimensiona) um elemento do lugar errado até o lugar certo. */
  async function fixPlacement(target: HTMLElement, token: number, guides?: () => HTMLElement[]) {
    const offset = readOffset(target);
    if (!offset) return;
    const ov = ensureOverlay();
    setTool('move');

    const isResize = offset.scale !== 1 && offset.tx === 0 && offset.ty === 0;
    const handle = (b: Box) =>
      isResize ? { x: b.x + b.w, y: b.y + b.h } : { x: b.x + b.w * 0.5, y: b.y + b.h * 0.42 };

    const start = handle(docBox(target));
    await ov.moveTo(start.x, start.y, token);
    ov.select(target, target.dataset.layer ?? 'camada');
    await timeline.wait(120, token);
    ov.press();
    await timeline.wait(120, token);

    let shown: HTMLElement[] = [];
    await timeline.tween(isResize ? 700 : 850, token, (e) => {
      applyOffset(target, offset, e);
      ov.select(target, target.dataset.layer ?? 'camada');
      const p = handle(docBox(target));
      ov.follow(p.x, p.y);
      if (e > 0.72 && !shown.length && guides) shown = guides();
    });

    clearOffset(target);
    ov.release();
    await timeline.wait(500, token);
    ov.clearGuides(shown);
    await timeline.wait(250, token);
    ov.unselect();
  }

  /** "Digita" um bloco de texto renderizado por <TypedText>. */
  async function typeText(target: HTMLElement, token: number, charsPerSecond = 95) {
    const id = target.dataset.typingId;
    const total = Number(target.dataset.length ?? 0);
    if (!id || !total) return;
    const ov = ensureOverlay();
    setTool('text');
    const box = docBox(target);
    await ov.moveTo(box.x + 6, box.y + 10, token, 600);
    await ov.click(token);

    for (let n = 0; n <= total; n += 2) {
      setTyped(id, n);
      ov.select(target, 'texto', 'text');
      await timeline.wait(2000 / charsPerSecond, token);
    }
    setTyped(id, undefined);
    ov.unselect();
  }

  /** Muda a cor de preenchimento usando o painel "Fill". */
  async function recolor(target: HTMLElement, token: number) {
    const ov = ensureOverlay();
    ov.select(target, target.dataset.layer ?? 'camada');
    const swatches = ov.openFill(target, FILL_COLORS, GRAY);
    const pick = swatches[1];
    const box = docBox(pick);
    await ov.moveTo(box.x + 14, box.y + 14, token, 520);
    await ov.click(token);
    pick.classList.add('is-picked');
    ov.setFillHex(COBALT);
    target.style.backgroundColor = '';
    await timeline.wait(550, token);
    ov.closeFill();
    ov.unselect();
  }

  // ---------------------------------------------------------------- hero

  /** Deixa o topo "fora do lugar" antes da abertura terminar. */
  function prepareHero() {
    if (reducedMotion) return;
    for (const role of ['name', 'photo', 'skill-card']) {
      const node = q(role);
      const o = node && readOffset(node);
      if (node && o) applyOffset(node, o);
    }
    const name = q('name');
    if (name) name.style.backgroundColor = GRAY;
    const lead = q('lead');
    if (lead?.dataset.typingId) setTyped(lead.dataset.typingId, 0);
  }

  async function heroSequence(token: number) {
    const name = q('name');
    const hello = q('hello');
    const lead = q('lead');
    const photo = q('photo');
    const card = q('skill-card');
    const firstCard = q('skill-card-first');
    setBusy(true);

    if (name && hello) {
      await fixPlacement(name, token, () => {
        const a = docBox(hello);
        const b = docBox(name);
        return [
          ensureOverlay().guide({ x: a.x, y: a.y, w: 1, h: b.y + b.h - a.y + 10 }),
          ensureOverlay().guide({ x: a.x, y: b.y + b.h + 14, w: b.w, h: 1 }, '0'),
        ];
      });
      await recolor(name, token);
    }
    if (lead) await typeText(lead, token);
    if (photo) {
      await fixPlacement(photo, token, () => {
        const a = docBox(photo);
        return [ensureOverlay().guide({ x: a.x - 30, y: a.y, w: 1, h: a.h }, String(Math.round(a.h)))];
      });
    }
    if (card && firstCard) {
      await fixPlacement(card, token, () => {
        const c1 = docBox(firstCard);
        const c2 = docBox(card);
        return [
          ensureOverlay().guide(
            { x: c2.x + c2.w / 2, y: c1.y + c1.h, w: 1, h: c2.y - c1.y - c1.h },
            String(Math.round(c2.y - c1.y - c1.h)),
          ),
        ];
      });
    }

    await ensureOverlay().leave(token);
    publish();
  }

  function publish() {
    setBusy(false);
    editorState.set((s) => ({ ...s, toast: true }));
    setTimeout(() => editorState.set((s) => ({ ...s, toast: false })), 2600);
  }

  // ------------------------------------------------------------ seções

  /** Alvos marcados com `data-edit-section` recebem um ajuste quando entram na tela. */
  async function sectionSequence(target: HTMLElement, token: number) {
    setBusy(true);
    const ov = ensureOverlay();
    const kind = target.dataset.editSection;

    if (kind === 'place-image') {
      setTool('image');
      const box = docBox(target);
      await ov.moveTo(box.x + box.w / 2, box.y + box.h / 2, token);
      await ov.click(token);
      target.dataset.placed = 'true';
      ov.select(target, target.dataset.layer ?? 'imagem');
      await timeline.wait(800, token);
      ov.unselect();
    } else if (kind === 'card') {
      const sibling = target.nextElementSibling;
      await fixPlacement(target, token, () => {
        const a = docBox(target);
        const out = [ov.guide({ x: a.x, y: a.y - 12, w: 1, h: a.h + 24 })];
        if (sibling) {
          const b = docBox(sibling);
          out.push(ov.guide({ x: a.x + a.w, y: a.y + a.h / 2, w: b.x - a.x - a.w, h: 1 }, String(Math.round(b.x - a.x - a.w))));
        }
        return out;
      });
    } else {
      await fixPlacement(target, token, () => {
        const a = docBox(target);
        return [ov.guide({ x: a.x, y: a.y + a.h + 10, w: a.w, h: 1 }, String(Math.round(a.w)))];
      });
    }

    await ov.leave(token);
    setBusy(false);
  }

  function prepareSections() {
    document.querySelectorAll<HTMLElement>('[data-edit-section]').forEach((node) => {
      if (reducedMotion) {
        node.dataset.placed = 'true';
        return;
      }
      const o = readOffset(node);
      if (o) applyOffset(node, o);
    });
  }

  function watchSections(token: number) {
    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          void enqueue((t) => sectionSequence(entry.target as HTMLElement, t), token);
        }
      },
      { threshold: 0.55 },
    );
    document.querySelectorAll('[data-edit-section]').forEach((node) => observer!.observe(node));
  }

  // ------------------------------------------------------------ API pública

  return {
    /** Chamado logo após montar a página (antes da abertura sumir). */
    prepare() {
      prepareHero();
      prepareSections();
    },

    /** Chamado quando a abertura termina. */
    start() {
      if (reducedMotion) return;
      const token = timeline.next();
      void enqueue((t) => heroSequence(t), token);
      watchSections(token);
    },

    /** Reexecuta a montagem do topo da página. */
    replay() {
      if (reducedMotion) return;
      const token = timeline.next();
      overlay?.hideCursor();
      overlay?.unselect();
      overlay?.closeFill();
      queue = Promise.resolve();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        prepareHero();
        void enqueue((t) => heroSequence(t), token);
      }, 450);
    },

    destroy() {
      timeline.next();
      observer?.disconnect();
      overlay?.destroy();
      overlay = null;
    },
  };
}

export type EditorSession = ReturnType<typeof createEditorSession>;
