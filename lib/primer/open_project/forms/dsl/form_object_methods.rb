# frozen_string_literal: true

module Primer
  module OpenProject
    module Forms
      module Dsl
        module FormObjectMethods
          def fieldset_group(**, &)
            add_input FieldsetInputGroup.new(builder:, form:, **, &)
          end
        end
      end
    end
  end
end
