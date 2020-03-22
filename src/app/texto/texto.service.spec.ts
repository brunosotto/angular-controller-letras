import { HttpConnectorServiceMock } from './../../../mock/http-connector.service.mock';
import { TestBed, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { HttpConnectorService } from '../security/http-connector.service';
import { UtilityService } from '../utility.service';
import { Project } from '../models/project.model';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        UtilityService
      ]
    });
  });

  const project: Project = {
    id: '1234',
    name: 'Bruno',
    documentNumber: '325',
    phone: '(11) 94863-9694',
    auctioneer: '12345'
  };

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));

  it('should be listProjects', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [
        { total: 1, projects: [project] }
      ];
      (http as any).testSetup('respPost', respPost);

      const option = 'auctioneer';
      const value = '12345';
      const page = 1;
      service.listProjects(option, value, page).subscribe(
        res => {
          expect(res.projects[0].name).toBe('Bruno');
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be listProject erro', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      const option = 'auctioneer';
      const value = '12345';
      const page = 1;
      service.listProjects(option, value, page).subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be findProject', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [project];
      (http as any).testSetup('respPost', respPost);

      service.findProject('1234').subscribe(
        res => {
          expect(res.name).toBe('Bruno');
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be finfProject erro', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      service.findProject('1234').subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be deleteProject', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [{ success: 'true', deleted: '1234' }];
      (http as any).testSetup('respPost', respPost);

      service.deleteProject(project).subscribe(
        res => {
          expect(res.success).toBeTruthy();
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be deleteProject erro', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      service.deleteProject(project).subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be addProject', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [{ success: 'true', deleted: '1234' }];
      (http as any).testSetup('respPost', respPost);

      service.addProject(project).subscribe(
        res => {
          expect(res.success).toBeTruthy();
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be addProject erro', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      service.addProject(project).subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be updateProject', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [{ success: 'true', id: '1234' }];
      (http as any).testSetup('respPost', respPost);

      service.updateProject(project).subscribe(
        res => {
          expect(res.success).toBeTruthy();
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be updateProject erro', inject(
    [ProjectService, HttpConnectorService],
    (service: ProjectService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      service.updateProject(project).subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be limit', inject(
    [ProjectService],
    (service: ProjectService) => {

      expect(service.limit).toBe(10);

    }
  ));

});
