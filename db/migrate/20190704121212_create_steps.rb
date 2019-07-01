class CreateSteps < ActiveRecord::Migration[6.0]
  def change
    create_table :steps do |t|
      t.string :pipeline_slug
      t.integer :order
      t.string :label
      t.string :command
      t.timestamps
    end
  end
end
