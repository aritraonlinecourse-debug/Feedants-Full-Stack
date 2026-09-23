import {
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CompetitionTabs({
  description = '',
  judgingParameters = [],
  rules = [],
  eligibility = [],
}) {
  const [
    activeTab,
    setActiveTab,
  ] = useState('ABOUT');

  const tabs = [
    {
      id: 'ABOUT',
      label: 'About Competition',
    },
    {
      id: 'JUDGING',
      label: 'Judging Parameters',
    },
    {
      id: 'RULES',
      label: 'Rules & Eligibility',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.tabScroll
        }
      >
        {tabs.map((tab) => {
          const active =
            activeTab === tab.id;

          return (
            <View
              key={tab.id}
              style={styles.tabWrapper}
            >
              <Text
                onPress={() =>
                  setActiveTab(tab.id)
                }
                style={[
                  styles.tab,
                  active &&
                    styles.activeTab,
                ]}
              >
                {tab.label}
              </Text>

              {active ? (
                <View
                  style={styles.activeLine}
                />
              ) : null}
            </View>
          );
        })}
      </ScrollView>

      {activeTab === 'ABOUT' ? (
        <AboutContent
          description={description}
        />
      ) : null}

      {activeTab === 'JUDGING' ? (
        <ListContent
          title="Judging Parameters"
          items={
            judgingParameters
          }
        />
      ) : null}

      {activeTab === 'RULES' ? (
        <RulesContent
          rules={rules}
          eligibility={eligibility}
        />
      ) : null}
    </View>
  );
}

function AboutContent({
  description,
}) {
  const [
    expanded,
    setExpanded,
  ] = useState(false);

  const hasDescription =
    Boolean(
      description &&
        description.trim()
    );

  return (
    <View style={styles.content}>
      <Text
        style={styles.body}
        numberOfLines={
          expanded ? undefined : 4
        }
      >
        {hasDescription
          ? description
          : 'Competition details will be available here.'}
      </Text>

      {hasDescription ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            setExpanded(!expanded)
          }
        >
          <Text
            style={styles.viewMore}
          >
            {expanded
              ? 'View less⌃'
              : 'View more⌄'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function ListContent({
  title,
  items,
}) {
  return (
    <View style={styles.content}>
      <Text style={styles.subTitle}>
        {title}
      </Text>

      {items.length ? (
        items.map(
          (item, index) => (
            <View
              key={`${item}-${index}`}
              style={styles.listRow}
            >
              <Text style={styles.number}>
                {index + 1}.
              </Text>

              <Text style={styles.body}>
                {item}
              </Text>
            </View>
          )
        )
      ) : (
        <Text style={styles.body}>
          No information available.
        </Text>
      )}
    </View>
  );
}

function RulesContent({
  rules,
  eligibility,
}) {
  return (
    <View style={styles.content}>
      <Text style={styles.subTitle}>
        Rules
      </Text>

      {rules.map(
        (rule, index) => (
          <View
            key={`rule-${index}`}
            style={styles.listRow}
          >
            <Text style={styles.bullet}>
              •
            </Text>

            <Text style={styles.body}>
              {rule}
            </Text>
          </View>
        )
      )}

      <Text
        style={[
          styles.subTitle,
          styles.eligibilityTitle,
        ]}
      >
        Eligibility
      </Text>

      {eligibility.map(
        (item, index) => (
          <View
            key={`eligibility-${index}`}
            style={styles.listRow}
          >
            <Text style={styles.bullet}>
              •
            </Text>

            <Text style={styles.body}>
              {item}
            </Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    marginBottom: 12,
    overflow: 'hidden',
  },

  tabScroll: {
    paddingHorizontal: 4,
  },

  tabWrapper: {
    position: 'relative',
    marginHorizontal: 4,
  },

  tab: {
    color: '#71809F',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 15,
  },

  activeTab: {
    color: '#078C91',
    fontWeight: '700',
  },

  activeLine: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: '#078C91',
  },

  content: {
    padding: 15,
  },

  body: {
    color: '#71809F',
    fontSize: 13,
    lineHeight: 21,
  },

  viewMore: {
    color: '#078C91',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 7,
  },

  subTitle: {
    color: '#14264A',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },

  listRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  number: {
    width: 25,
    color: '#078C91',
    fontWeight: '700',
  },

  bullet: {
    width: 20,
    color: '#078C91',
    fontSize: 17,
  },

  eligibilityTitle: {
    marginTop: 10,
  },
});