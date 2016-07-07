import { Meteor } from 'meteor/meteor';
import { name as MessageAdd } from '../messageAdd';
import { Messages } from '../../../../api/messages/index';
import 'angular-mocks';

describe('MessageAdd', () => {
  beforeEach(() => {
    window.module(MessageAdd);
  });
 
  describe('controller', () => {
    let controller;
    const message = {
      name: 'Foo',
      description: 'Birthday of Foo',
      public: true
    };
    const user = {
      _id: 'userId'
    };
 
    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(MessageAdd, {
          $scope: $rootScope.$new(true)
        });
      });
      spyOn(Meteor, 'user').and.returnValue(user);
    });
 
    describe('reset()', () => {
      it('should clean up message object', () => {
        controller.message = message;
        controller.reset();
 
        expect(controller.message).toEqual({});
      });
    });
 
    describe('submit()', () => {
      beforeEach(() => {
        spyOn(Messages, 'insert');
        spyOn(controller, 'reset').and.callThrough();
 
        controller.message = message;
 
        controller.submit();
      });
 
      it('should insert a new message', () => {
        expect(Messages.insert).toHaveBeenCalledWith({
          name: message.name,
          description: message.description,
          public: message.public,
          owner: user._id
        });
      });
 
      it('should call reset()', () => {
        expect(controller.reset).toHaveBeenCalled();
      });
    });
  });
});