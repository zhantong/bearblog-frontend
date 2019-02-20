import React from "react";
import {Label, Menu} from "semantic-ui-react";
import Link from 'next/link'


export default ({category}) => {
    if (!category) {
        return null;
    }
    return (
        <Menu.Item>
            <Label size='mini'>{category.articleCount}</Label>
            <Link as={`/category/${category.slug}`} href={`/index?category=${category.slug}`}>
                <a>{category.name}</a>
            </Link>
        </Menu.Item>
    )
}

