module ActionDispatch
  class Cookies
    Kernel::silence_warnings do
      MAX_COOKIE_SIZE = 5120
    end
  end
end
