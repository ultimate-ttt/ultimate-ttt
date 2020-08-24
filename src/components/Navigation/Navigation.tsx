import * as React from 'react';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarTitle,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarFixedAdjust,
} from '@rmwc/top-app-bar';
import { Icon } from '@rmwc/icon';
import { Drawer, DrawerContent } from '@rmwc/drawer';
import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListDivider,
} from '@rmwc/list';
import { Link, NavLink } from 'react-router-dom';
import routes from '../../routes/routes';
import icons from '../../icons/icons';
import styles from './Navigation.module.css';

interface NavigationProps { }

export function Navigation(props: NavigationProps) {
  const [open, setOpen] = useState(false);
  function closeDrawer() {
    setOpen(false);
  }

  function getNavigationItem(
    text: string,
    icon: string,
    route: string,
    external?: boolean,
  ) {
    const content = (
      <>
        <ListItemGraphic
          className={styles.primaryColor}
          icon={{ icon: icon, size: 'medium', 'aria-hidden': true }}
        />
        <ListItemText className={styles.primaryColor}>{text}</ListItemText>
      </>
    );
    return external ? (
      <ListItem
        tag="a"
        href={route}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.listItem}
      >
        {content}
      </ListItem>
    ) : (
        <ListItem
          {...{
            tag: NavLink,
            to: route,
            activeClassName: 'mdc-list-item--activated',
            exact: true,
          }}
          onClick={() => closeDrawer()}
        >
          {content}
        </ListItem>
      );
  }

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon
              role="button"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <div>
                <Icon
                  icon={{
                    icon: icons.menu,
                    size: 'medium',
                    'aria-hidden': true,
                  }}
                />
              </div>
              <span className="sr-only">Menu</span>
            </TopAppBarNavigationIcon>
            <TopAppBarTitle
              className={styles.title}
              {...{ tag: Link, to: routes.Home }}
            >
              Ultimate Tic-Tac-Toe
            </TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarActionItem
              tag="a"
              target="_blank"
              rel="noopener noreferrer"
              href={routes.GitHub}
            >
              <div>
                <Icon
                  icon={{
                    icon: icons.github,
                    size: 'medium',
                    'aria-label': 'GitHub Icon',
                  }}
                />
              </div>
            </TopAppBarActionItem>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <Drawer tag="nav" aria-label="Site" modal open={open}>
        <DrawerContent>
          <List>
            {getNavigationItem('Play', icons.game, routes.Home)}
            {getNavigationItem(
              'Analysis',
              icons.history,
              routes.AnalysisOverview,
            )}
            {getNavigationItem(
              'Analyse Last Game',
              icons.replay,
              routes.AnalysisLatest,
            )}
            <ListDivider />
            {getNavigationItem(
              'Report Bug',
              icons.bug,
              routes.GitHub + '/issues/new?template=bug_report.md',
              true,
            )}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
}
