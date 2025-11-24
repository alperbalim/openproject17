/*
 * -- copyright
 * OpenProject is an open source project management software.
 * Copyright (C) the OpenProject GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License version 3.
 *
 * OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
 * Copyright (C) 2006-2013 Jean-Philippe Lang
 * Copyright (C) 2010-2013 the ChiliProject Team
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * See COPYRIGHT and LICENSE files for more details.
 * ++
 */

import { Controller } from '@hotwired/stimulus';

interface SelectedItem {
  label?:string|null;
  value?:string|null;
  inputName?:string|null;
}

interface SelectPanelElement extends HTMLElement {
  selectedItems:SelectedItem[]
  items:SelectPanelItem[]
  isItemDisabled(item:SelectPanelItem|null):boolean;
  disableItem(item:SelectPanelItem|null):void;
  enableItem(item:SelectPanelItem|null):void;
  checkItem(item:SelectPanelItem|null):void;
  uncheckItem(item:SelectPanelItem|null):void;
}

export type SelectPanelItem = HTMLLIElement;

export default class BacklogSettings extends Controller<HTMLElement> {
  static targets = ['storyTypes', 'taskType'];

  declare readonly storyTypesTarget:SelectPanelElement;
  declare readonly taskTypeTarget:SelectPanelElement;

  storyTypesTargetConnected(target:SelectPanelElement) {
    target.addEventListener('itemActivated', () => {
      this.syncSelectPanels(target, this.taskTypeTarget);
    });
  }

  taskTypeTargetConnected(target:SelectPanelElement) {
    target.addEventListener('itemActivated', () => {
      this.syncSelectPanels(target, this.storyTypesTarget);
    });
  }

  private syncSelectPanels(source:SelectPanelElement, target:SelectPanelElement) {
    const sourceSelectedValues = new Set(source.selectedItems.map((item) => item.value));

    target.items.forEach((targetItem) => {
      const itemContent = targetItem.querySelector<HTMLElement>('.ActionListContent');
      const itemValue   = itemContent?.dataset.value;
      const shouldDisable = sourceSelectedValues.has(itemValue);

      if (shouldDisable) {
        target.disableItem(targetItem);
        target.uncheckItem(targetItem);
      } else {
        target.enableItem(targetItem);
      }
    });
  }
}
