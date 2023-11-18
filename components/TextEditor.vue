<template>
  <div
    v-if="editor"
    class="rounded-md text-sm px-3 py-2 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
  >
    <div class="flex flex-wrap gap-2 mt-2">
      <template v-for="(item, index) in menuItems">
        <div v-if="item?.type === 'divider'" :key="`divider` + index" class="border-r" />
        <button
          v-else
          :key="item?.title"
          type="button"
          class="p-1 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 rounded flex justify-center items-center"
          :class="{ 'bg-white text-black': item?.isActive ? item?.isActive() : null }"
          :title="item?.title"
          @click.stop="item?.action"
        >
          <UIcon :name="item.icon" />
        </button>
      </template>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/vue-3';

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();

interface Emits {
  (event: 'update:modelValue', newValue: string): void;
}

const emits = defineEmits<Emits>();

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    const html = editor.getHTML();
    emits('update:modelValue', html ?? '');
  },
  editorProps: {
    attributes: {
      class: 'content outline-none focus:outline-none',
      style: 'font-size: inherit',
    },
  },
  extensions: [
    StarterKit.configure({
      history: false,
    }),
  ],
});

type MenuItem =
  | {
      icon: string;
      title: string;
      action: () => void;
      isActive?: () => boolean;
    }
  | {
      type?: 'divider';
    };

const menuItems = computed<MenuItem[]>(() => [
  {
    icon: 'i-mdi-format-bold',
    title: 'Bold',
    action: () => editor.value?.chain().focus().toggleBold().run(),
    isActive: () => editor.value?.isActive('bold'),
  },
  {
    icon: 'i-mdi-format-italic',
    title: 'Italic',
    action: () => editor.value?.chain().focus().toggleItalic().run(),
    isActive: () => editor.value?.isActive('italic'),
  },
  {
    icon: 'i-mdi-format-strikethrough\n',
    title: 'Strike',
    action: () => editor.value?.chain().focus().toggleStrike().run(),
    isActive: () => editor.value?.isActive('strike'),
  },
  {
    icon: 'i-mdi-code-braces',
    title: 'Code',
    action: () => editor.value?.chain().focus().toggleCode().run(),
    isActive: () => editor.value?.isActive('code'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'i-mdi-format-header-1',
    title: 'Heading 1',
    action: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.value?.isActive('heading', { level: 1 }),
  },
  {
    icon: 'i-mdi-format-header-2',
    title: 'Heading 2',
    action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.value?.isActive('heading', { level: 2 }),
  },
  {
    icon: 'i-mdi-format-header-3',
    title: 'Heading 3',
    action: () => editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => editor.value?.isActive('heading', { level: 3 }),
  },
  {
    icon: 'i-mdi-format-header-4',
    title: 'Heading 4',
    action: () => editor.value?.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => editor.value?.isActive('heading', { level: 4 }),
  },
  {
    icon: 'i-mdi-format-header-5',
    title: 'Heading 5',
    action: () => editor.value?.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: () => editor.value?.isActive('heading', { level: 5 }),
  },
  {
    icon: 'i-mdi-format-header-6',
    title: 'Heading 6',
    action: () => editor.value?.chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: () => editor.value?.isActive('heading', { level: 6 }),
  },
  {
    icon: 'i-mdi-format-paragraph',
    title: 'Paragraph',
    action: () => editor.value?.chain().focus().setParagraph().run(),
    isActive: () => editor.value?.isActive('paragraph'),
  },
  {
    icon: 'i-mdi-format-list-bulleted',
    title: 'Bullet List',
    action: () => editor.value?.chain().focus().toggleBulletList().run(),
    isActive: () => editor.value?.isActive('bulletList'),
  },
  {
    icon: 'i-mdi-format-list-numbered',
    title: 'Ordered List',
    action: () => editor.value?.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.value?.isActive('orderedList'),
  },
  {
    icon: 'i-mdi-format-list-checks',
    title: 'Task List',
    action: () => editor.value?.chain().focus().toggleTaskList().run(),
    isActive: () => editor.value?.isActive('taskList'),
  },
  {
    icon: 'i-mdi-code-braces',
    title: 'Code Block',
    action: () => editor.value?.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.value?.isActive('codeBlock'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'i-mdi-format-quote-open',
    title: 'Blockquote',
    action: () => editor.value?.chain().focus().toggleBlockquote().run(),
    isActive: () => editor.value?.isActive('blockquote'),
  },
  {
    icon: 'i-mdi-border-horizontal',
    title: 'Horizontal Rule',
    action: () => editor.value?.chain().focus().setHorizontalRule().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'i-mdi-wrap',
    title: 'Hard Break',
    action: () => editor.value?.chain().focus().setHardBreak().run(),
  },
  {
    icon: 'i-mdi-format-clear',
    title: 'Clear Format',
    action: () => editor.value?.chain().focus().clearNodes().unsetAllMarks().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'i-mdi-arrow-u-left-top',
    title: 'Undo',
    action: () => editor.value?.chain().focus().undo().run(),
  },
  {
    icon: 'i-mdi-arrow-u-right-top',
    title: 'Redo',
    action: () => editor.value?.chain().focus().redo().run(),
  },
]);
</script>

<style scoped></style>
