import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Image from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';

export const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3]
    }
  }),
  Underline,
  TextStyle,
  Color,
  Highlight,
  TaskList,
  TaskItem.configure({ nested: true }),
  Link.configure({
    autolink: true,
    openOnClick: false
  }),
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
  Image,
  CharacterCount,
  TextAlign.configure({
    types: ['heading', 'paragraph']
  })
];
