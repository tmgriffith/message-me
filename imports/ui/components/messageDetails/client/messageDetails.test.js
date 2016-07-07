import { name as MessageDetails } from '../messageDetails';
import { Messages } from '../../../../api/messages/index';
import 'angular-mocks';
 
describe('MessageDetails', () => {
  beforeEach(() => {
    window.module(MessageDetails);
  });
 
  describe('controller', () => {
    let controller;
    const message = {
      _id: 'messageId',
      name: 'Foo',
      description: 'Birthday of Foo',
      public: true
    };
 
    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(MessageDetails, {
          $scope: $rootScope.$new(true)
        });
      });
    });
 
    describe('save()', () => {
      beforeEach(() => {
        spyOn(Messages, 'update');
        controller.message = message;
        controller.save();
      });
 
      it('should update a proper message', () => {
        expect(Messages.update.calls.mostRecent().args[0]).toEqual({
          _id: message._id
        });
      });
 
      it('should update with proper modifier', () => {
        expect(Messages.update.calls.mostRecent().args[1]).toEqual({
          $set: {
            name: message.name,
            description: message.description,
            public: message.public
          }
        });
      });
    });
  });
});