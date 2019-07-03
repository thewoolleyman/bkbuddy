class CreateMonitoredPipelines < ActiveRecord::Migration[6.0]
  def change
    create_table :monitored_pipelines, id: :string, primary_key: 'slug' do |t|
      t.string :name
      t.timestamps
    end
  end
end
