module Admin
  module Settings
    class BacklogsSettingsForm < ApplicationForm
      form do |f|
        f.select_panel(
          name: :story_types,
          label: I18n.t(:backlogs_story_type),
          title: Type.model_name.human(count: 2),
          select_variant: :multiple,
          fetch_strategy: :local,
          dynamic_label: true,
          dynamic_label_prefix: I18n.t(:label_selected_types),
          data: {
            admin__backlogs_settings_target: "storyTypes"
          }
        ) do |select_menu|
          available_types.each do |label, value|
            select_menu.with_item(
              label:,
              content_arguments: { data: { value: } },
              active: Story.types.include?(value),
              disabled: Task.type == value,
              item_id: "type-#{value}",
              label_arguments: { classes: "__hl_inline_type_#{value}" }
            )
          end
        end

        f.select_panel(
          name: :task_type,
          label: I18n.t(:backlogs_task_type),
          title: Type.model_name.human(count: 2),
          fetch_strategy: :local,
          dynamic_label: true,
          dynamic_label_prefix: I18n.t(:label_selected_type),
          data: {
            admin__backlogs_settings_target: "taskType"
          }
        ) do |select_menu|
          available_types.each do |label, value|
            select_menu.with_item(
              label:,
              content_arguments: { data: { value: } },
              active: Task.type == value,
              disabled: Story.types.include?(value),
              item_id: "type-#{value}",
              label_arguments: { classes: "__hl_inline_type_#{value}" }
            )
          end
        end

        f.radio_button_group(
          name: :points_burn_direction,
          label: I18n.t(:backlogs_points_burn_direction)
        ) do |group|
          group.radio_button(
            label: I18n.t(:label_points_burn_up),
            value: "up",
            checked: Setting.plugin_openproject_backlogs["points_burn_direction"] == "up"
          )
          group.radio_button(
            label: I18n.t(:label_points_burn_down),
            value: "down",
            checked: Setting.plugin_openproject_backlogs["points_burn_direction"] == "down"
          )
        end

        f.text_field(
          name: :wiki_template,
          label: I18n.t(:backlogs_wiki_template),
          value: Setting.plugin_openproject_backlogs["wiki_template"],
          input_width: :small
        )

        f.submit(scheme: :primary, name: :apply, label: I18n.t(:button_apply))
      end

      private

      def available_types
        Type.pluck(:name, :id)
      end
    end
  end
end
