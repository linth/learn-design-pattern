/**
 * 狀態模式 (State Pattern) - 文檔編輯器模式切換
 *
 * 編輯器有四種模式：選擇、編輯、預覽，每種模式下滑鼠、鍵盤、渲染行為都不同。
 *
 * Reference:
 *  - https://refactoring.guru/design-patterns/state
 *  - https://www.youtube.com/watch?v=h8x6lBkwRUQ
 */

/** [狀態介面] 編輯器模式 */
interface EditorState {
  handleMouseClick(): void;
  handleKeyPress(): void;
  render(): void;
}

/** [具體狀態] 選擇模式 */
class SelectMode implements EditorState {
  handleMouseClick(): void {
    console.log('選擇模式 - 框選文字');
  }

  handleKeyPress(): void {
    console.log('選擇模式 - 移動選取範圍');
  }

  render(): void {
    console.log('選擇模式 - 顯示選取框');
  }
}

/** [具體狀態] 編輯模式 */
class EditMode implements EditorState {
  handleMouseClick(): void {
    console.log('編輯模式 - 移動游標');
  }

  handleKeyPress(): void {
    console.log('編輯模式 - 輸入文字');
  }

  render(): void {
    console.log('編輯模式 - 顯示編輯工具列');
  }
}

/** [具體狀態] 預覽模式 */
class PreviewMode implements EditorState {
  handleMouseClick(): void {
    console.log('預覽模式 - 無編輯操作');
  }

  handleKeyPress(): void {
    console.log('預覽模式 - 滾動頁面');
  }

  render(): void {
    console.log('預覽模式 - 顯示最終排版');
  }
}

/** [環境類別] 編輯器，可在執行時期切換模式 */
class Editor {
  private state: EditorState;

  constructor() {
    this.state = new SelectMode();
  }

  setState(state: EditorState): void {
    this.state = state;
  }

  handleMouseClick(): void {
    this.state.handleMouseClick();
  }

  handleKeyPress(): void {
    this.state.handleKeyPress();
  }

  render(): void {
    this.state.render();
  }
}

{
  const editor = new Editor();

  console.log('--- 選擇模式 ---');
  editor.handleMouseClick();
  editor.handleKeyPress();
  editor.render();

  console.log('\n--- 編輯模式 ---');
  editor.setState(new EditMode());
  editor.handleMouseClick();
  editor.handleKeyPress();
  editor.render();

  console.log('\n--- 預覽模式 ---');
  editor.setState(new PreviewMode());
  editor.handleMouseClick();
  editor.handleKeyPress();
  editor.render();
}