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
import { Drawer, DrawerContent } from '@rmwc/drawer';
import { useState } from 'react';
import { List, ListItem, ListItemGraphic, ListItemText } from '@rmwc/list';
import { Link, NavLink } from 'react-router-dom';
import routes from '../../routes/routes';
import styles from './Navigation.module.css';
import {
  BugReportIcon,
  GameIcon,
  GitHubIcon,
  HelpIcon,
  HistoryIcon,
  MenuIcon,
  ReplayIcon,
} from '../Icons';

export function Navigation() {
  const [open, setOpen] = useState(false);

  function closeDrawer() {
    setOpen(false);
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
              icon={{
                icon: (
                  <>
                    <MenuIcon />
                    <span className="sr-only">Menu</span>
                  </>
                ),
                'aria-hidden': true,
              }}
            />
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
              icon={{
                icon: <GitHubIcon />,
                'aria-label': 'GitHub Icon',
              }}
            />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <Drawer
        tag="nav"
        aria-label="Site"
        modal
        open={open}
        onClose={closeDrawer}
      >
        <DrawerContent>
          <List>
            <NavigationItem
              text={'Play'}
              icon={<GameIcon />}
              route={routes.Home}
              onClick={closeDrawer}
            />
            <NavigationItem
              text={'How to play'}
              icon={<HelpIcon />}
              route={routes.HowToPlay}
              onClick={closeDrawer}
            />
            <NavigationItem
              text={'Analysis'}
              icon={<HistoryIcon />}
              route={routes.AnalysisOverview}
              onClick={closeDrawer}
            />
            <NavigationItem
              text={'Analyse Last Game'}
              icon={<ReplayIcon />}
              route={routes.AnalysisLatest}
              onClick={closeDrawer}
            />
            <NavigationItem
              text={'Report Bug'}
              icon={<BugReportIcon />}
              route={routes.GitHubBug}
              external={true}
              onClick={closeDrawer}
            />
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
}

interface NavigationItemProps {
  text: string;
  icon: React.ReactNode;
  route: string;
  external?: boolean;
  onClick?: () => void;
}

function NavigationItem(props: NavigationItemProps) {
  const content = (
    <>
      <ListItemGraphic
        className={styles.primaryColor}
        icon={{ icon: props.icon, size: 'medium', 'aria-hidden': true }}
      />
      <ListItemText className={styles.primaryColor}>{props.text}</ListItemText>
    </>
  );

  return props.external ? (
    <ListItem
      tag="a"
      href={props.route}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.listItem}
      onClick={props.onClick}
    >
      {content}
    </ListItem>
  ) : (
    <ListItem
      {...{
        tag: NavLink,
        to: props.route,
        activeClassName: 'mdc-list-item--activated',
        exact: true,
        className: styles.listItem,
      }}
      onClick={props.onClick}
    >
      {content}
    </ListItem>
  );
}
