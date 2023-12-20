import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  let wrapper;
  let user = 'Bayu'
  beforeEach(() => {
    jest.spyOn(window, "prompt").mockImplementation(() => user);
    wrapper = shallowMount(HelloWorld);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render component with title", () => {
    const title = "Simple Chat";

    const h2 = wrapper.find("h2");

    expect(h2.text()).toMatch(title);
  });

  it("should update the component user data when user type the name in prompt", () => {
    const expectedUser = user

    const componentUser = wrapper.vm.user

    expect(componentUser).toMatch(expectedUser)
  });

  it('should called sendMessage and update the chats data when user click the send button', async () => {
    const sendMessageSpy = jest.spyOn(wrapper.vm, 'sendMessage')
    const message = "test"
    const expectedChats = [
      {
        user,
        message
      }
    ]

    await wrapper.find('input').setValue(message)
    await wrapper.find('#sendBtn').trigger('click')

    expect(sendMessageSpy).toHaveBeenCalled()
    expect(wrapper.vm.chats).toEqual(expectedChats)
  })
});
