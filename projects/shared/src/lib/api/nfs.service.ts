import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { NFSCluster } from '~/app/ceph/nfs/models/nfs-cluster-config';

import { NfsFSAbstractionLayer, SUPPORTED_FSAL } from '~/app/ceph/nfs/models/nfs.fsal';
import { ApiClient } from '@api/api-client';

export interface Directory {
  paths: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NfsService extends ApiClient {
  apiPath = 'api/nfs-ganesha';
  uiApiPath = 'ui-api/nfs-ganesha';

  nfsAccessType = [
    {
      value: 'RW',
      help: `Allows all operations`
    },
    {
      value: 'RO',
      help: `Allows only operations that do not modify the server`
    },
    {
      value: 'NONE',
      help: `Allows no access at all`
    }
  ];

  nfsFsal: NfsFSAbstractionLayer[] = [
    {
      value: SUPPORTED_FSAL.CEPH,
      descr: `CephFS`,
      disabled: false
    },
    {
      value: SUPPORTED_FSAL.RGW,
      descr: `Object Gateway`,
      disabled: false
    }
  ];
  nfsSquash = {
    no_root_squash: ['no_root_squash', 'noidsquash', 'none'],
    root_id_squash: ['root_id_squash', 'rootidsquash', 'rootid'],
    root_squash: ['root_squash', 'rootsquash', 'root'],
    all_squash: ['all_squash', 'allsquash', 'all', 'allanonymous', 'all_anonymous']
  };

  constructor(private http: HttpClient) {
    super();
  }

  list(clusterId?: string) {
    return this.http.get(`${this.apiPath}/export`, {
      params: { cluster_id: clusterId }
    });
  }

  get(clusterId: string, exportId: string) {
    return this.http.get(`${this.apiPath}/export/${clusterId}/${exportId}`);
  }

  create(nfs: any) {
    return this.http.post(`${this.apiPath}/export`, nfs, {
      headers: { Accept: this.getVersionHeaderValue(2, 0) },
      observe: 'response'
    });
  }

  update(clusterId: string, id: number, nfs: any) {
    return this.http.put(`${this.apiPath}/export/${clusterId}/${id}`, nfs, {
      headers: { Accept: this.getVersionHeaderValue(2, 0) },
      observe: 'response'
    });
  }

  delete(clusterId: string, exportId: string) {
    return this.http.delete(`${this.apiPath}/export/${clusterId}/${exportId}`, {
      headers: { Accept: this.getVersionHeaderValue(2, 0) },
      observe: 'response'
    });
  }

  listClusters() {
    return this.http.get(`${this.apiPath}/cluster`, {
      headers: { Accept: this.getVersionHeaderValue(0, 1) }
    });
  }

  lsDir(fs_name: string, root_dir: string): Observable<Directory> {
    if (!fs_name) {
      return throwError(`Please specify a filesystem volume.`);
    }
    return this.http.get<Directory>(`${this.uiApiPath}/lsdir/${fs_name}?root_dir=${root_dir}`);
  }

  fsals() {
    return this.http.get(`${this.uiApiPath}/fsals`);
  }

  filesystems() {
    return this.http.get(`${this.uiApiPath}/cephfs/filesystems`);
  }

  nfsClusterList(): Observable<NFSCluster[]> {
    return this.http.get<NFSCluster[]>(`${this.apiPath}/cluster`, {
      headers: { Accept: this.getVersionHeaderValue(0, 1) },
      params: { info: true }
    });
  }
}
