/**
 * state design 
 * 
 * 假設我們正在開發一個簡單的文檔編輯器，可以切換不同的編輯模式：
 *  - 選擇模式（Select Mode）
 *  - 編輯模式（Edit Mode）
 *  - 預覽模式（Preview Mode）。
 * 
 * 每種模式下，編輯器的行為和界面都會有所不同。
 * 
 */


interface EditorState {
  handleMouseClick(): void;
  handleKeyPress(): void;
  render(): void;
}


class SelectMode implements EditorState {
  handleMouseClick(): void {
    console.log('選擇模式 - 處理滑鼠點擊事件');
  }

  handleKeyPress(): void {
    console.log('選擇模式 - 處理按鍵事件');
  }

  render(): void {
    console.log('選擇模式 - 渲染編輯器界面');      
  }
}

class EditMode implements EditorState {
  handleMouseClick(): void {
    console.log('編輯模式 - 處理滑鼠點擊事件');
  }

  handleKeyPress(): void {
    console.log('編輯模式 - 處理按鍵事件');
  }

  render(): void {
    console.log('編輯模式 - 渲染編輯器界面');
  }
}

class PreviewMode implements EditorState {
  handleMouseClick(): void {
    console.log('預覽模式 - 處理滑鼠點擊事件');
  }

  handleKeyPress(): void {
    console.log('預覽模式 - 處理按鍵事件');
  }

  render(): void {
    console.log('預覽模式 - 渲染編輯器界面');
  }
}

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
  // 可以提供切換不同狀態 (意即切換模式)
  
  const editor = new Editor();

  editor.handleMouseClick(); // 選擇模式 - 處理滑鼠點擊事件
  editor.handleKeyPress();  // 選擇模式 - 處理按鍵事件
  editor.render();          // 選擇模式 - 渲染編輯器界面

  editor.setState(new EditMode());

  editor.handleMouseClick(); // 編輯模式 - 處理滑鼠點擊事件
  editor.handleKeyPress();  // 編輯模式 - 處理按鍵事件
  editor.render();          // 編輯模式 - 渲染編輯器界面

  editor.setState(new PreviewMode());

  editor.handleMouseClick(); // 預覽模式 - 處理滑鼠點擊事件
  editor.handleKeyPress();  // 預覽模式 - 處理按鍵事件
  editor.render();          // 預覽模式 - 渲染編輯器界面
}