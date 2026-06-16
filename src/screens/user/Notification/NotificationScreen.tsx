import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../constants/colors';
import CommonHeader from '../../../components/common/CommonHeader';

// ─── Types ──────────────────────────────────────────────────────────────────────

type NotificationCategory = 'all' | 'jobs' | 'applications' | 'system';

type NotificationItem = {
  id: string;
  type: 'job' | 'application' | 'system' | 'message';
  title: string;
  body: string;
  time: string;
  read: boolean;
};

// ─── Mock Data ──────────────────────────────────────────────────────────────────

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'job',
    title: 'New Job Match!',
    body: 'Senior React Native Developer at TechCorp matches your profile.',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'application',
    title: 'Application Viewed',
    body: 'Your application for Frontend Engineer at Zomato was viewed.',
    time: '1 hr ago',
    read: false,
  },
  {
    id: '3',
    type: 'application',
    title: 'Interview Scheduled',
    body: 'Congratulations! Your interview with Swiggy is on 20 Jun at 11:00 AM.',
    time: '3 hr ago',
    read: false,
  },
  {
    id: '4',
    type: 'job',
    title: '5 New Jobs Near You',
    body: 'Check out the latest openings in Bengaluru for your skills.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Profile Completion',
    body: 'Your profile is 80% complete. Add your skills to attract more recruiters.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '6',
    type: 'application',
    title: 'Application Rejected',
    body: 'Unfortunately, your application for iOS Developer at Paytm was not shortlisted.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '7',
    type: 'message',
    title: 'Recruiter Message',
    body: 'Priya from Infosys sent you a message regarding your application.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '8',
    type: 'system',
    title: 'Resume Tips',
    body: 'Boost your visibility — update your resume with recent projects.',
    time: '4 days ago',
    read: true,
  },
];

// ─── Icon Map ────────────────────────────────────────────────────────────────────

const NOTIFICATION_ICON: Record<
  NotificationItem['type'],
  { icon: string; bg: string; color: string }
> = {
  job: { icon: 'briefcase-outline', bg: '#EFF6FF', color: COLORS.info },
  application: { icon: 'file-check-outline', bg: '#F0FDF4', color: COLORS.success },
  system: { icon: 'cog-outline', bg: COLORS.backgroundSecondary, color: COLORS.primary },
  message: { icon: 'message-text-outline', bg: '#FFF7ED', color: COLORS.warning },
};

// ─── Filter Tab ──────────────────────────────────────────────────────────────────

const TABS: { key: NotificationCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'applications', label: 'Applications' },
  { key: 'system', label: 'System' },
];

// ─── Notification Card ──────────────────────────────────────────────────────────

type NotificationCardProps = {
  item: NotificationItem;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
};

const NotificationCard: React.FC<NotificationCardProps> = ({ item, onRead, onDelete }) => {
  const meta = NOTIFICATION_ICON[item.type];

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onRead(item.id)}
      style={[styles.card, !item.read && styles.cardUnread]}
    >
      {/* Unread Dot */}
      {!item.read && <View style={styles.unreadDot} />}

      {/* Icon Badge */}
      <View style={[styles.iconBadge, { backgroundColor: meta.bg }]}>
        <Icon name={meta.icon} size={22} color={meta.color} />
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <View style={styles.cardTopRow}>
          <Text style={[styles.cardTitle, !item.read && styles.cardTitleUnread]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardTime}>{item.time}</Text>
        </View>
        <Text style={styles.cardBody} numberOfLines={2}>
          {item.body}
        </Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        onPress={() => onDelete(item.id)}
      >
        <Icon name="close" size={16} color={COLORS.gray300} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// ─── Empty State ─────────────────────────────────────────────────────────────────

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIconWrap}>
      <Icon name="bell-sleep-outline" size={52} color={COLORS.primary} />
    </View>
    <Text style={styles.emptyTitle}>All Caught Up!</Text>
    <Text style={styles.emptySubtitle}>
      You have no notifications right now.{'\n'}Check back later.
    </Text>
  </View>
);

// ─── Section Divider ─────────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <Text style={styles.sectionLabel}>{label}</Text>
);

// ─── Main Component ──────────────────────────────────────────────────────────────

const Notification = () => {
  const [activeTab, setActiveTab] = useState<NotificationCategory>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'jobs') return n.type === 'job';
    if (activeTab === 'applications') return n.type === 'application';
    if (activeTab === 'system') return n.type === 'system' || n.type === 'message';
    return true;
  });

  const todayItems = filtered.filter(n =>
    ['2 min ago', '1 hr ago', '3 hr ago'].includes(n.time),
  );
  const earlierItems = filtered.filter(
    n => !['2 min ago', '1 hr ago', '3 hr ago'].includes(n.time),
  );

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to remove all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setNotifications([]),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Header ── */}
      <CommonHeader BackIcon title="Notifications" />

      {/* ── Action Row ── */}
      {notifications.length > 0 && (
        <View style={styles.actionRow}>
          {unreadCount > 0 ? (
            <TouchableOpacity onPress={markAllRead} style={styles.actionBtn}>
              <Icon name="check-all" size={16} color={COLORS.primary} />
              <Text style={styles.actionBtnText}>Mark all read</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity onPress={clearAll} style={styles.actionBtn}>
            <Icon name="trash-can-outline" size={16} color={COLORS.danger} />
            <Text style={[styles.actionBtnText, { color: COLORS.danger }]}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Tabs ── */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {TABS.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tab, isActive && styles.tabActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
                {tab.key === 'all' && unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── List ── */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={
            <>
              {todayItems.length > 0 && (
                <>
                  <SectionLabel label="TODAY" />
                  {todayItems.map(item => (
                    <NotificationCard
                      key={item.id}
                      item={item}
                      onRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </>
              )}
              {earlierItems.length > 0 && (
                <>
                  <SectionLabel label="EARLIER" />
                  {earlierItems.map(item => (
                    <NotificationCard
                      key={item.id}
                      item={item}
                      onRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </>
              )}
              <View style={{ height: 40 }} />
            </>
          }
          keyExtractor={() => 'list'}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Notification;

// ─── Styles ──────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Action Row
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Tabs
  tabsWrapper: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabsContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    marginRight: 4,
    gap: 6,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray500,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  badge: {
    backgroundColor: COLORS.danger,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // Section Label
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gray400,
    letterSpacing: 1.2,
    marginTop: 14,
    marginBottom: 6,
    marginLeft: 2,
  },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  cardUnread: {
    backgroundColor: '#F0F9FF',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  unreadDot: {
    position: 'absolute',
    top: 14,
    left: -6,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.white,
    zIndex: 1,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray700,
    flex: 1,
    marginRight: 6,
  },
  cardTitleUnread: {
    color: COLORS.gray800,
    fontWeight: '700',
  },
  cardTime: {
    fontSize: 11,
    color: COLORS.gray400,
    flexShrink: 0,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.gray500,
    lineHeight: 18,
  },
  deleteBtn: {
    padding: 2,
    marginLeft: 6,
    marginTop: 2,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    paddingHorizontal: 32,
  },
  emptyIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.gray400,
    textAlign: 'center',
    lineHeight: 22,
  },
});
