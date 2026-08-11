# Cloud Cost Optimization Standards

| Field | Value |
|---|---|
| **Domain** | FinOps |

## Overview

This document outlines the standards and best practices for cloud cost optimization across our organization. These standards provide a framework for consistent, efficient management of cloud resources to maximize value while controlling costs.

## Resource Tagging Standards

### Mandatory Tags

All cloud resources must include the following tags:

- **CostCenter**: Financial cost center responsible for the resource
- **Environment**: Production, Development, Test, or Staging
- **Application**: Application or service name
- **Owner**: Team or individual responsible for the resource
- **Project**: Associated project code (if applicable)

### Optional Tags

- **Temporary**: "Yes" for resources planned for deletion
- **SecurityLevel**: Classification of data security requirements
- **SchedulePlan**: Identifier for start/stop scheduling pattern
- **PerformanceTier**: Performance requirements indicator

## Budget Management

### Budget Creation

- Each cost center must have an approved cloud budget
- Budgets should be allocated by environment, application, and resource type
- Budget forecasts should account for planned growth and seasonal variations

### Budget Alerts

- Budget consumption alerts must be configured at 50%, 75%, and 90% thresholds
- Alert notifications must be sent to resource owners and financial stakeholders
- Automated actions should be considered for non-production resources at threshold breach

## Resource Optimization Standards

### Compute Resources

- Idle instances (CPU < 5% for 2+ weeks) must be identified for potential decommissioning
- Right-sizing recommendations must be reviewed monthly
- Auto-scaling must be implemented for variable workloads
- Reserved Instances/Savings Plans should be utilized for stable workloads

### Storage Resources

- Data lifecycle policies must be implemented for all storage
- Tiered storage should be utilized based on access patterns
- Orphaned volumes must be identified and removed within 30 days
- Storage compression and deduplication should be enabled where appropriate

### Database Resources

- Database instance sizing must be reviewed quarterly
- Database scaling should match application usage patterns
- License-optimized database options should be considered
- Database storage should be monitored and right-sized monthly

## Scheduled Operations

### Non-Production Resources

- Development environments should be scheduled to run only during business hours
- Test environments should be deployed only when needed and decommissioned when tests complete
- Automated start/stop schedules must be implemented for non-production resources
- Schedule exceptions must be documented and approved

## Cost Allocation and Chargeback

### Cost Allocation Model

- Cloud costs must be allocated to the consuming business unit or department
- Shared platform services costs should be allocated based on an approved distribution model
- Infrastructure costs should be mapped to applications and services

### Chargeback/Showback

- Monthly showback reports must be provided to all cost center owners
- Chargeback should include unit costs and consumption metrics
- Anomalies in spending must be highlighted and investigated

## Procurement Standards

### Reserved Capacity

- Workloads with >60% utilization over 3+ months should be evaluated for reserved capacity
- Reserved capacity commitments must be approved by finance and IT leadership
- Reserved capacity utilization must be reviewed quarterly

### Discount Programs

- Volume discount programs should be leveraged across the organization
- Enterprise agreements should be negotiated for significant cloud providers
- Marketplace procurement should utilize existing discount programs

## Reporting Standards

### Cadence

- Daily: Automated cost anomaly alerts
- Weekly: Team-level cost summaries
- Monthly: Detailed cost reviews with optimization recommendations
- Quarterly: Executive summaries and trend analysis

### Metrics

Standard reporting metrics include:

- Month-over-month spending trends
- Forecast accuracy
- Cost per application/service
- Cost optimization savings
- Unit economics (cost per user/transaction)

## FinOps Operational Model

### Roles and Responsibilities

- FinOps Team: Tooling, reporting, standards, and governance
- Cloud Platform Teams: Implementation of technical optimizations
- Application Teams: Application-level optimizations and efficient code
- Business Units: Budget ownership and prioritization decisions

### Meeting Cadence

- Weekly FinOps team operational meeting
- Monthly cloud cost review with platform teams
- Quarterly business review with financial stakeholders
- Annual cloud economics planning session

## Continuous Improvement

### Optimization Backlog

- A prioritized backlog of cost optimization initiatives must be maintained
- Optimization initiatives should include estimated effort and potential savings
- Completed optimizations must track actual vs. estimated savings

### Best Practice Adoption

- Cloud provider cost optimization recommendations should be reviewed weekly
- Industry best practices should be evaluated quarterly for adoption
- Internal learning and sharing sessions should be conducted monthly
