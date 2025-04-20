// Style sheet for alerts page

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  alertCard: {
    backgroundColor: '#F1F1F1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  alertDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  alertDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },

  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

  tabButtonText: {
    fontSize: 14,
    color: '#888',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100, // extra space for tab bar
  },
  moreDetails: {
    color: '#007AFF',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },

  furtherDetail: {
    marginTop: 6,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default styles;