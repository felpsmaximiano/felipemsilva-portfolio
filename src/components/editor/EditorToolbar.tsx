import { useSyncExternalStore } from 'react';
import { editorState, type EditorTool } from '@/lib/editor-session';
import { useLanguage } from '@/i18n';
import { ToolIcon } from '@/components/ui/Icons';
import './EditorToolbar.css';

const TOOLS: { id: EditorTool; label: string; optional?: boolean }[] = [
  { id: 'move', label: 'Mover' },
  { id: 'frame', label: 'Frame', optional: true },
  { id: 'text', label: 'Texto' },
  { id: 'image', label: 'Imagem', optional: true },
];

/** Barra inferior no estilo de um editor de design, com status e botão de rever a montagem. */
interface EditorToolbarProps {
  /** A barra sobe só depois da abertura, junto com o cursor. */
  visible: boolean;
  onReplay: () => void;
}

export function EditorToolbar({ visible, onReplay }: EditorToolbarProps) {
  const { t } = useLanguage();
  const state = useSyncExternalStore(editorState.subscribe, editorState.get);

  return (
    <>
      <div
        className={`editor-toolbar${state.idle ? ' is-idle' : ''}${visible ? '' : ' is-hidden'}`}
        role="toolbar"
        aria-label={t.toolbarLabel}
      >
        {TOOLS.map((tool) => (
          <span
            key={tool.id}
            className={`editor-toolbar__tool${tool.optional ? ' is-optional' : ''}${state.tool === tool.id ? ' is-active' : ''}`}
            title={tool.label}
          >
            <ToolIcon tool={tool.id} />
          </span>
        ))}
        <span className="editor-toolbar__sep" />
        <span className="editor-toolbar__who">
          <i>FM</i>
          <span>{state.status === 'editing' ? t.editing : t.published}</span>
        </span>
        <button type="button" onClick={onReplay}>
          ▶ <span>{t.replay}</span>
        </button>
      </div>
      <div className={`editor-toast${state.toast ? ' is-visible' : ''}`} role="status">
        <i />
        <span>{t.publishedToast}</span>
      </div>
    </>
  );
}
