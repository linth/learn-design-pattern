"use strict";
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
 * Reference:
 *  - https://refactoring.guru/design-patterns/state
 *  - https://www.youtube.com/watch?v=h8x6lBkwRUQ
 */
class SelectMode {
    handleMouseClick() {
        console.log('選擇模式 - 處理滑鼠點擊事件');
    }
    handleKeyPress() {
        console.log('選擇模式 - 處理按鍵事件');
    }
    render() {
        console.log('選擇模式 - 渲染編輯器界面');
    }
}
class EditMode {
    handleMouseClick() {
        console.log('編輯模式 - 處理滑鼠點擊事件');
    }
    handleKeyPress() {
        console.log('編輯模式 - 處理按鍵事件');
    }
    render() {
        console.log('編輯模式 - 渲染編輯器界面');
    }
}
class PreviewMode {
    handleMouseClick() {
        console.log('預覽模式 - 處理滑鼠點擊事件');
    }
    handleKeyPress() {
        console.log('預覽模式 - 處理按鍵事件');
    }
    render() {
        console.log('預覽模式 - 渲染編輯器界面');
    }
}
class Editor {
    constructor() {
        this.state = new SelectMode();
    }
    setState(state) {
        this.state = state;
    }
    handleMouseClick() {
        this.state.handleMouseClick();
    }
    handleKeyPress() {
        this.state.handleKeyPress();
    }
    render() {
        this.state.render();
    }
}
{
    // 可以提供切換不同狀態 (意即切換模式)
    const editor = new Editor();
    editor.handleMouseClick(); // 選擇模式 - 處理滑鼠點擊事件
    editor.handleKeyPress(); // 選擇模式 - 處理按鍵事件
    editor.render(); // 選擇模式 - 渲染編輯器界面
    editor.setState(new EditMode());
    editor.handleMouseClick(); // 編輯模式 - 處理滑鼠點擊事件
    editor.handleKeyPress(); // 編輯模式 - 處理按鍵事件
    editor.render(); // 編輯模式 - 渲染編輯器界面
    editor.setState(new PreviewMode());
    editor.handleMouseClick(); // 預覽模式 - 處理滑鼠點擊事件
    editor.handleKeyPress(); // 預覽模式 - 處理按鍵事件
    editor.render(); // 預覽模式 - 渲染編輯器界面
}
