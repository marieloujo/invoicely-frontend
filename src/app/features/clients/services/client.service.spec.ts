import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { Client } from '@app/shared/models/client.model';
import { environment } from '@environments/environment';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService],
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch clients', () => {
    const dummyClients: Client[] = [
      { id: '1', first_name: 'John', last_name: 'Doe', email: 'johndoe@example.com', adresse: 'Cotonou', full_name: null },
      { id: '2', first_name: 'Jane', last_name: 'Doe', email: 'janedoe@example.com', adresse: 'Cotonou', full_name: null }
    ];

    service.getClients(1).subscribe(clients => {
      expect(clients.data.data.length).toBe(2);
      expect(clients.data.data).toEqual(dummyClients);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/clients`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyClients);
  });

  it('should add a client', () => {
    const dummyClient: Client = { id: '1', first_name: 'John', last_name: 'Doe', email: 'johndoe@example.com', adresse: 'Cotonou', full_name: null };

    service.addClient(dummyClient).subscribe(client => {
      expect(client.data).toEqual(dummyClient);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/clients`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyClient);
  });

  it('should update a client', () => {
    const updatedClient: Client = { id: '1', first_name: 'Updated John', last_name: 'Doe', email: 'johndoe@example.com', adresse: 'Cotonou', full_name: null };

    service.updateClient(updatedClient).subscribe(client => {
      expect(client.data).toEqual(updatedClient);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/clients/${updatedClient.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedClient);
  });

  it('should delete a client', () => {
    const clientId = '1';

    service.deleteClient(clientId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.API_URL}/clients/${clientId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
