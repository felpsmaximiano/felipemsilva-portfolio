import { createStore } from './store';

export type EditorTool = 'move' | 'frame' | 'text' | 'image';

export interface EditorState {
  tool: EditorTool;
  status: 'editing' | 'published';
  idle: boolean;
  toast: boolean;
}

/** Estado da barra de ferramentas (ferramenta ativa, status, aviso de publicação). */
export const editorState = createStore<EditorState>({
  tool: 'move',
  status: 'editing',
  idle: false,
  toast: false,
});

/**
 * Quantos caracteres de cada bloco de texto já foram "digitados".
 * `undefined` = texto completo (estado normal da página).
 */
export const typingState = createStore<Record<string, number | undefined>>({});

export function setTyped(id: string, chars: number | undefined) {
  typingState.set((prev) => ({ ...prev, [id]: chars }));
}
