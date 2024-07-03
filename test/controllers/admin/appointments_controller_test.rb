require "test_helper"

class Admin::AppointmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get admin_appointments_index_url
    assert_response :success
  end
end
