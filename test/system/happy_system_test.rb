require "application_system_test_case"

class HappySystemTest < ApplicationSystemTestCase
  test "happy path" do
    visit root_url
    assert_selector "span", text: "Kathryn Janeway"
    assert_selector "h1", text: "janeway@voyager.gov"
    click_button text: 'Read pipelines from Buildkite'
    find "li", text: 'Tracker - Web'
  end
end
