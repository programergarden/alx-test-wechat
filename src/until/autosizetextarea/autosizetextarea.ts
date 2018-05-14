import {Directive, HostListener, ElementRef, Input, Output, EventEmitter} from "@angular/core";

@Directive({
  selector:'ion-textarea[autosize]'
})

export class AutosizetextareaDirective {
  @HostListener('input',['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
  @Input('autosize') maxHeight: number;
  @Input('base') minHeight: number;
  @Output() contentCount: EventEmitter<number> = new EventEmitter<number>();

  constructor(public element: ElementRef) {}

  ngOnInit(): void {
    this.adjust();
  }

  adjust(): void {
    let textarea = this.element.nativeElement, newHeight;
    if(textarea) {
      textarea.style.overflow = 'hidden';
    }
    if(!this.minHeight){
        this.minHeight = 80;
    }
    if(textarea.lastElementChild) {
      this.contentCount.emit(textarea.lastElementChild.textLength);
      textarea.lastElementChild.style.width = '100%';
      if (this.maxHeight) {
        if(textarea.lastElementChild.textLength > this.maxHeight)
          textarea.lastElementChild.value = textarea.lastElementChild.value.substr(0,this.maxHeight);
          return ;
      }
    }
    textarea.style.height = this.minHeight;
    if(this.maxHeight)
      newHeight = Math.min(textarea.scrollHeight,this.maxHeight);
    else
      newHeight = Math.min(textarea.scrollHeight,this.minHeight);

    textarea.style.height = newHeight;
  }

}
