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
import {
  List,
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListDivider,
} from '@rmwc/list';
import { Link, NavLink } from 'react-router-dom';
import routes from '../../routes/routes';
import styles from './Navigation.module.css';
import {
  BugReportIcon,
  GameIcon,
  GitHubIcon,
  HistoryIcon,
  MenuIcon,
  ReplayIcon,
} from '../Icons';

interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  const [open, setOpen] = useState(false);
  function closeDrawer() {
    setOpen(false);
  }

  function getNavigationItem(
    text: string,
    icon: React.ReactNode,
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
        onClose={() => closeDrawer()}
        className="disableMotion"
      >
        <DrawerContent>
          <List>
            {getNavigationItem('Play', <GameIcon />, routes.Home)}
            {getNavigationItem(
              'Analysis',
              <HistoryIcon />,
              routes.AnalysisOverview,
            )}
            {getNavigationItem(
              'Analyse Last Game',
              <ReplayIcon />,
              routes.AnalysisLatest,
            )}
            <ListDivider />
            {getNavigationItem(
              'Report Bug',
              <BugReportIcon />,
              routes.GitHub + '/issues/new?template=bug_report.md',
              true,
            )}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
}
