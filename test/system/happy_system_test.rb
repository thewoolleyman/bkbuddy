require "application_system_test_case"

class HappySystemTest < ApplicationSystemTestCase
  test "happy path" do
    visit root_url
    assert_selector "#navbar", text: "Kathryn Janeway"
    click_button text: 'Read pipelines from Buildkite'
    find "li", text: 'Tracker - Web'
  end
end
