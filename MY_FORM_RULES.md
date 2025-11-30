
## My rules for writing Form classes using Primer Forms

https://gist.github.com/myabc/7af385548b6545fff94dd386a2cb41d3

- Mirror naming of Controller / view for easy discovery

  Given the folllowing controller and view:

  `Admin::Settings::ExperimentalSettingsController`
  `app/views/admin/settings/experimental_settings/show.html.erb`

  Name the form class as follows:

  `Admin::Settings::ExperimentalSettingsForm`

- Include `Form` in the class name, except for buttons. THis is to avoid class-name collisions.
  For example, creating a Form named `Project` will result in needin

- In Rails views, always use Form classes rather than inline forms.

- In components use a Form class when the form needs to be reusable or to faciliate easier testing.

- Provided your Form has a backing model (e.g. `model:` is passed to `primer_form_with`), you can
  use `attribute_name` to get a humanized attribute name.

- Use dry-initializer to DRY up passing iniitializers

```ruby
    class ProjectForm < ApplicationForm
      extend Dry::Initializer

      param  :name,  proc(&:to_s)
      option :current_user, default: proc { false }

      form do |f|
        # ...
      end
    end
```

- If your form needs an instance of `Principal`, define `current_user` as an option (or keyword param)
  with a sensible default. This facilitates easier testing.

- Write some basic specs for the Form class (this still needs to be fleshed out).
  `spec/support/forms` provides useful helpers.

