<template>
	<div>
		<editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
			<b-button-group size="sm">
				<b-button :pressed.sync="isActive.bold()" @click="commands.bold" variant="secondary">
					<b-icon icon="type-bold"></b-icon>
				</b-button>
				<b-button :pressed.sync="isActive.italic()" @click="commands.italic" variant="secondary">
					<b-icon icon="type-italic"></b-icon>
				</b-button>
				<b-button :pressed.sync="isActive.strike()" @click="commands.strike" variant="secondary">
					<b-icon icon="type-strikethrough"></b-icon>
				</b-button>
				<b-button :pressed.sync="isActive.underline()" @click="commands.underline" variant="secondary">
					<b-icon icon="type-underline"></b-icon>
				</b-button>
				<b-button :pressed.sync="isActive.heading()" @click="commands.heading()" variant="secondary">
					<b-icon icon="card-heading"></b-icon>
				</b-button>
				<b-button :pressed.sync="isActive.code()" @click="commands.code" variant="secondary">
					<b-icon icon="code"></b-icon>
				</b-button>
			</b-button-group>
		</editor-menu-bar>
		<editor-content :editor="editor" class="border rounded editor p-3" />
	</div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
	Heading,
	Bold,
	Italic,
	Strike,
	Underline,
	Code,
	HardBreak
} from "tiptap-extensions";

export default {
	name: "ContentEditor",
	components: {
		EditorMenuBar,
		EditorContent
  },
  mounted() {
		this.editor.setContent(this.content);
    this.editor.on('update', ({ getHTML }) => {
      this.$emit('update', getHTML());
		});
	},
	props: {
		content: String
	},
	data: () => ({
		editor: new Editor({
			extensions: [
				new Heading(),
				new Bold(),
				new Italic(),
				new HardBreak(),
				new Strike(),
				new Underline(),
				new Code()
			]
		})
	}),
	beforeDestroy() {
		this.editor.destroy();
	}
};


</script>

<style>
.editor > *:focus {
	outline: none !important;
}

</style>