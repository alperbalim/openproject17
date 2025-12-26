# frozen_string_literal: true

#-- copyright
# OpenProject is an open source project management software.
# Copyright (C) the OpenProject GmbH
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License version 3.
#
# OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
# Copyright (C) 2006-2013 Jean-Philippe Lang
# Copyright (C) 2010-2013 the ChiliProject Team
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See COPYRIGHT and LICENSE files for more details.
#++

module OpPrimer
  class FieldsetComponent < Primer::Component
    attr_reader :legend_text

    renders_one :legend, ->(text:, **system_arguments) {
      system_arguments = deny_tag_argument(**system_arguments)
      system_arguments[:tag] = :legend
      system_arguments[:classes] = class_names(
        system_arguments[:classes],
        { "sr-only" => @visually_hide_legend }
      )

      Primer::BaseComponent.new(**system_arguments).with_content(text)
    }

    # @param aria-label [String] String that can be read by assistive technology. A label should be short and concise. See the accessibility section for more information.
    # @param system_arguments [Hash] <%= link_to_system_arguments_docs %>
    def initialize(legend_text:, visually_hide_legend: false, **system_arguments)
      super()

      @legend_text = legend_text

      @system_arguments = deny_tag_argument(**system_arguments)
      @system_arguments[:tag] = :fieldset

      validate_aria_label if visually_hide_legend

      @visually_hide_legend = visually_hide_legend
    end

    def render?
      content? && (legend_text.present? || legend?)
    end
  end
end
