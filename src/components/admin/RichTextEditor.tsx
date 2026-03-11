import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import PlaceholderExtension from '@tiptap/extension-placeholder';

import UnderlineExtension from '@tiptap/extension-underline';
import { useEffect, useCallback } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus,
  Link, Image as ImageIcon, Undo, Redo,
  Code,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ─── Toolbar Button ─── */
const ToolbarBtn = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={cn(
      'p-1.5 rounded transition-colors',
      active
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
    )}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-px h-5 bg-border mx-0.5 self-center" />;

/* ─── Toolbar ─── */
const Toolbar = ({
  editor,
  onInsertImage,
}: {
  editor: Editor;
  onInsertImage?: () => void;
}) => {
  const setLink = useCallback(() => {
    const prev = editor.getAttributes('link').href;
    const url = window.prompt('URL', prev ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border bg-muted/30 rounded-t-lg">
      {/* Undo / Redo */}
      <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="w-4 h-4" />
      </ToolbarBtn>

      <Divider />

      {/* Headings */}
      <ToolbarBtn
        title="Heading 1"
        active={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Heading 2"
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Heading 3"
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="w-4 h-4" />
      </ToolbarBtn>

      <Divider />

      {/* Marks */}
      <ToolbarBtn
        title="Bold"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Italic"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Underline"
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Strikethrough"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Inline Code"
        active={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="w-4 h-4" />
      </ToolbarBtn>

      <Divider />

      {/* Lists */}
      <ToolbarBtn
        title="Bullet List"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Numbered List"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Blockquote"
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Horizontal Rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="w-4 h-4" />
      </ToolbarBtn>

      <Divider />

      {/* Link */}
      <ToolbarBtn
        title="Insert / Edit Link"
        active={editor.isActive('link')}
        onClick={setLink}
      >
        <Link className="w-4 h-4" />
      </ToolbarBtn>

      {/* Image */}
      {onInsertImage && (
        <ToolbarBtn title="Insert Image" onClick={onInsertImage}>
          <ImageIcon className="w-4 h-4" />
        </ToolbarBtn>
      )}
    </div>
  );
};

/* ─── Main Component ─── */
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  dir?: 'ltr' | 'rtl';
  onInsertImage?: (insertFn: (url: string) => void) => void;
  minHeight?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Write your article here...',
  dir = 'ltr',
  onInsertImage,
  minHeight = '320px',
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      ImageExtension.configure({ inline: false, allowBase64: false }),
      LinkExtension.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' } }),
      PlaceholderExtension.configure({ placeholder }),
      TextAlignExtension.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'outline-none',
        dir,
      },
    },
  });

  // Sync external value changes (e.g. when switching language tabs)
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  const handleInsertImage = useCallback(() => {
    if (!editor || !onInsertImage) return;
    onInsertImage((url: string) => {
      editor.chain().focus().setImage({ src: url }).run();
    });
  }, [editor, onInsertImage]);

  if (!editor) return null;

  return (
    <div className="border border-border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary/50 transition-all">
      <Toolbar editor={editor} onInsertImage={onInsertImage ? handleInsertImage : undefined} />
      <EditorContent
        editor={editor}
        style={{ minHeight }}
        className={cn(
          'px-4 py-3 text-sm text-foreground',
          '[&_.ProseMirror]:outline-none',
          '[&_.ProseMirror]:min-h-[inherit]',
          // Headings
          '[&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-3 [&_.ProseMirror_h1]:mt-5',
          '[&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h2]:mt-4',
          '[&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_h3]:mt-3',
          // Paragraph
          '[&_.ProseMirror_p]:mb-3 [&_.ProseMirror_p]:leading-relaxed',
          // Lists
          '[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:mb-3 [&_.ProseMirror_ul]:space-y-1',
          '[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:mb-3 [&_.ProseMirror_ol]:space-y-1',
          // Blockquote
          '[&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-primary/50 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-muted-foreground [&_.ProseMirror_blockquote]:my-3',
          // Code
          '[&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1.5 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-xs [&_.ProseMirror_code]:font-mono',
          '[&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:rounded-lg [&_.ProseMirror_pre]:my-3 [&_.ProseMirror_pre]:overflow-x-auto',
          // Links
          '[&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline',
          // Images
          '[&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:my-3',
          // HR
          '[&_.ProseMirror_hr]:border-border [&_.ProseMirror_hr]:my-4',
          // Placeholder
          '[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground/50 [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0',
        )}
      />
    </div>
  );
};

export default RichTextEditor;
