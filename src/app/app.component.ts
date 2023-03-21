import { Component } from '@angular/core';
import { NgTinyUrlService } from 'ng-tiny-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'url-shorter';
  model = {
    inputUrl: ' '
  };
  isFormSubmited = false;
  isLoading = false;
  shortUrl = ' ';
  isTextCopied = false;
  constructor(private tinyUrl: NgTinyUrlService) {}

  onSubmitUrlForm(urlForm: any) {
    if (urlForm.valid) {
      this.isLoading = true;
      this.tinyUrl.shorten(this.model.inputUrl).subscribe(
        (data) => {
          this.shortUrl = data;
          this.isFormSubmited = true;
          this.isLoading = false;
        },
        (error) => {
          alert('Something went wrong, please check your URL and try again');
          this.isLoading = false;
        }
      );
    }
  }

  //reset
  reset() {
    this.model.inputUrl = '';
    this.isFormSubmited = false;
    this.isTextCopied = false;
  }

  //copy
  copyUrl(shortUrlElementRef: any) {
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('value', shortUrlElementRef.innerHTML);
    inputElement.select();
    inputElement.setSelectionRange(0, 999999);
    try {
      navigator.clipboard.writeText(inputElement.value);
      this.isTextCopied = true;
      setTimeout(() => {
        this.isTextCopied = false;
      }, 2000);
    } catch (error: any) {
      console.warn('Error while coping', error.toString());
    }
  }
}
