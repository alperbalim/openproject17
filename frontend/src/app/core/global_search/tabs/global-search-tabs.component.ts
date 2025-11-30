//-- copyright
// OpenProject is an open source project management software.
// Copyright (C) the OpenProject GmbH
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See COPYRIGHT and LICENSE files for more details.
//++

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { Subscription } from 'rxjs';
import { GlobalSearchService } from 'core-app/core/global_search/services/global-search.service';
import { ScrollableTabsComponent } from 'core-app/shared/components/tabs/scrollable-tabs/scrollable-tabs.component';
import { TabDefinition } from 'core-app/shared/components/tabs/tab.interface';

@Component({
  selector: 'opce-global-search-tabs',
  templateUrl: '../../../shared/components/tabs/scrollable-tabs/scrollable-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GlobalSearchTabsComponent extends ScrollableTabsComponent implements OnInit, OnDestroy {
  private currentTabSub:Subscription;
  private tabsSub:Subscription;
  public currentTabId:string;
  public tabs:TabDefinition[] = [];

  public classes:string[] = ['global-search--tabs', 'scrollable-tabs'];

  constructor(
    readonly globalSearchService:GlobalSearchService,
    protected readonly $state:StateService,
    public injector:Injector,
    cdRef:ChangeDetectorRef,
  ) {
    super($state, cdRef, injector);
  }

  ngOnInit():void {
    // Initialize tabs from DOM/i18n since service exposes no observables
    this.tabs = [
      { id: 'all', label: this.globalSearchService['I18n']?.t('js.global_search.scope_all') || 'All', active: true },
      { id: 'work_packages', label: this.globalSearchService['I18n']?.t('js.global_search.scope_work_packages') || 'Work packages', active: false },
      { id: 'wiki_pages', label: this.globalSearchService['I18n']?.t('js.global_search.scope_wiki_pages') || 'Wiki pages', active: false },
      { id: 'news', label: this.globalSearchService['I18n']?.t('js.global_search.scope_news') || 'News', active: false },
    ] as unknown as TabDefinition[];
    this.tabs.forEach((tab) => (tab.path = '#'));
    this.currentTabId = 'all';
  }

  public clickTab(tab:TabDefinition, event:Event):void {
    super.clickTab(tab, event);

    // Read query from URL, submit search with chosen scope
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    this.currentTabId = tab.id;
    this.globalSearchService.submitSearch(query, tab.id);
  }

  ngOnDestroy():void {
    this.currentTabSub?.unsubscribe?.();
    this.tabsSub?.unsubscribe?.();
  }
}
