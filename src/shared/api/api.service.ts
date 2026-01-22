import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentData } from '@pages/viewer/model/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // DI
  private readonly http = inject(HttpClient);

  getDocument(id: string): Observable<DocumentData> {
    const safeId = encodeURIComponent(id);
    return this.http.get<DocumentData>(`/mock-data/${safeId}.json`);
  }
}
