import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import Icon from 'core-components/icon';

class Menu extends React.Component {

    static propTypes = {
        type: React.PropTypes.oneOf(['primary', 'secondary']),
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string.isRequired,
            icon: React.PropTypes.string
        })).isRequired,
        selectedIndex: React.PropTypes.number
    };

    static defaultProps = {
        type: 'primary',
        selectedIndex: 0
    };

    render() {
        return (
            <ul {...this.getProps()}>
                {this.props.items.map(this.renderListItem.bind(this))}
            </ul>
        )
    }

    renderListItem(item, index) {
        let iconNode = null;

        if (item.icon) {
            iconNode = <Icon className="menu__icon" name={item.icon} />;
        }

        return (
            <li {...this.getItemProps(index)}>
                {iconNode}{item.content}
            </li>
        );
    }

    getProps() {
        var props = _.clone(this.props);

        props.className = this.getClass();

        delete props.items;
        delete props.onItemClick;
        delete props.selectedIndex;
        delete props.type;

        return props;
    }

    getClass() {
        let classes = {
            'menu': true,
            'menu_secondary': (this.props.type === 'secondary')
        };

        classes[this.props.className] = true;

        return classNames(classes);
    }

    getItemProps(index) {
        return {
            className: this.getItemClass(index),
            onClick: this.handleItemClick.bind(this, index),
            key: index
        };
    }

    getItemClass(index) {
        let classes = {
            'menu__list-item': true,
            'menu__list-item_selected': (this.props.selectedIndex === index)
        };

        return classNames(classes);
    }

    handleItemClick(index) {
        if (this.props.onItemClick) {
            this.props.onItemClick(index);
        }
    }
}

export default Menu;