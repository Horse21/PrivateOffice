import {Injectable} from '@angular/core';
import {HttpClientService, IFileInfo} from "h21-be-ui-kit";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class FileUploaderService {
	constructor(private http: HttpClientService) {
	}

	upload(url: string, e: Event): Observable<IFileInfo> | null {
		if (this.isHTML5()) {
			return this.xhrTransport(url, e);
		} else {
			console.error(url, 'Unsupported browser.');
		}
	}

	private isHTML5(): boolean {
		return !!(
			(
				window as any
			).File && (
				window as any
			).FormData
		);
	}

	private xhrTransport(url: string, e: Event): Observable<IFileInfo> | null {
		const fileList: FileList = (
			e.target as HTMLInputElement
		).files;
		if (fileList.length > 0) {
			const file: File = fileList[0];
			const formData: FormData = new FormData();
			formData.append('image', file, file.name);
			return this.http.upload<IFileInfo>(url, formData);
		}
		return null;
	}
}
