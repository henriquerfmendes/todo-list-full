import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { OrdenationType } from './OrderTasks';

interface TaskOrderSelectorProps {
  ordenation: OrdenationType;
  setOrdenation: (value: OrdenationType) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function TaskOrderSelector({ ordenation, setOrdenation }: TaskOrderSelectorProps) {
  const orderOptions = {
    default: "Creation date",
    alphabetical: "Alphabetical",
    pending: "Pending",
    completed: "Completed"
  };

  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <span className="text-sm font-medium text-gray-300">
        Order by
      </span>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-64 justify-between items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {orderOptions[ordenation]}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </MenuButton>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {(Object.keys(orderOptions) as OrdenationType[]).map((option) => (
                <MenuItem key={option}>
                  {({ active }) => (
                    <button
                      onClick={() => setOrdenation(option)}
                      className={classNames(
                        active ? 'bg-gray-700 text-gray-200' : 'text-gray-300',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      {orderOptions[option]}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
} 
export default TaskOrderSelector;