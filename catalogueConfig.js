'use strict';

(function expose(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else if (root) root.CatalogueConfig = api;
}(typeof globalThis === 'undefined' ? this : globalThis, function buildConfig() {
  const CHAPTER_LIST = Object.freeze([
    {
      id: 'cloud_platform_infra',
      label: 'Cloud, Platform & Infrastructure',
      icon: '☁️',
      description: 'Owns the full infrastructure estate from bare metal to cloud-native, including cloud adoption strategy, platform engineering, container orchestration, virtualisation, specialised computing, server hardware, operating systems, networking, and cloud cost governance (FinOps).',
      order: 10,
      chapterLeadRoleId: 'leadership/cloud_platform_infrastructure_chapter_lead',
    },
    {
      id: 'devops_delivery',
      label: 'DevOps & Delivery',
      icon: '🔄',
      description: 'Owns the software delivery toolchain, internal developer platforms, CI/CD standards, application platform engineering, and integration & middleware architecture. Accountable for DORA metrics and delivery flow across the organisation.',
      order: 20,
      chapterLeadRoleId: 'leadership/devops_delivery_chapter_lead',
    },
    {
      id: 'data_ai',
      label: 'Data & AI',
      icon: '📊',
      description: 'Owns the data platform strategy, data architecture, database management standards, and AI governance frameworks. Ensures data quality, lineage, and ethical AI practices across the organisation.',
      order: 30,
      chapterLeadRoleId: 'leadership/data_ai_chapter_lead',
    },
    {
      id: 'security_identity',
      label: 'Security & Identity',
      icon: '🔒',
      description: 'Owns the end-to-end security posture, zero trust architecture, identity and access management, data protection, directory services, and security automation across all platforms and cloud environments.',
      order: 40,
      chapterLeadRoleId: 'leadership/security_identity_chapter_lead',
    },
    {
      id: 'end_user_workplace',
      label: 'End User & Workplace',
      icon: '🖥️',
      description: 'Owns the digital workplace experience, device management strategy, M365 platform, collaboration tooling, Tier-1/2/3 service desk operations, and end-user technology standards. Ensures employees have secure, productive, and consistent technology experiences.',
      order: 50,
      chapterLeadRoleId: 'leadership/end_user_workplace_chapter_lead',
    },
    {
      id: 'service_governance',
      label: 'Service & Governance',
      icon: '🎯',
      description: 'Owns IT service management, configuration management, SIAM frameworks, enterprise architecture governance, and infrastructure onboarding standards. Ensures IT operates as a consistent, measurable service across the organisation.',
      order: 60,
      chapterLeadRoleId: 'leadership/service_governance_chapter_lead',
    },
    {
      id: 'leadership_chapter',
      label: 'Leadership',
      icon: '👑',
      description: 'Cross-cutting leadership roles that span all chapters and domains. Includes C-Suite executives, Chapter Leads, Technical Area Leads (TAL), and Product Area Leads (PAL). These roles set technical direction, own people development, and represent IT at the business level.',
      order: 70,
      chapterLeadRoleId: null,
    },
  ].map(Object.freeze));

  const DOMAIN_LIST = Object.freeze([
    { id: 'cloud_platforms', label: 'Cloud Platforms', icon: '☁️', chapterId: 'cloud_platform_infra', order: 10, aliases: [] },
    { id: 'kubernetes', label: 'Kubernetes', icon: '☸️', chapterId: 'cloud_platform_infra', order: 20, aliases: [] },
    { id: 'modern_infrastructure', label: 'Modern Infrastructure', icon: '🚀', chapterId: 'cloud_platform_infra', order: 30, aliases: [] },
    { id: 'virtualization', label: 'Virtualization', icon: '📦', chapterId: 'cloud_platform_infra', order: 40, aliases: [] },
    { id: 'specialized_computing', label: 'Specialized Computing', icon: '⚡', chapterId: 'cloud_platform_infra', order: 50, aliases: [] },
    { id: 'server_hardware', label: 'Server Hardware', icon: '🖧', chapterId: 'cloud_platform_infra', order: 60, aliases: [] },
    { id: 'server_hardware_hpe', label: 'HPE Server Hardware', icon: '🖧', chapterId: 'cloud_platform_infra', order: 70, aliases: [] },
    { id: 'server_os_linux', label: 'Linux Server OS', icon: '🐧', chapterId: 'cloud_platform_infra', order: 80, aliases: [] },
    { id: 'server_os_windows', label: 'Windows Server OS', icon: '🪟', chapterId: 'cloud_platform_infra', order: 90, aliases: [] },
    { id: 'network', label: 'Network', icon: '🌐', chapterId: 'cloud_platform_infra', order: 100, aliases: [] },
    { id: 'finops', label: 'FinOps', icon: '💰', chapterId: 'cloud_platform_infra', order: 110, aliases: ['FinOps'] },
    { id: 'devops', label: 'DevOps', icon: '🔄', chapterId: 'devops_delivery', order: 10, aliases: [] },
    { id: 'app_platforms', label: 'App Platforms', icon: '⚙️', chapterId: 'devops_delivery', order: 20, aliases: [] },
    { id: 'integration_middleware', label: 'Integration & Middleware', icon: '🔗', chapterId: 'devops_delivery', order: 30, aliases: [] },
    { id: 'quality_engineering', label: 'Quality Engineering', icon: '🧪', chapterId: 'devops_delivery', order: 40, aliases: [] },
    { id: 'data_engineering', label: 'Data Engineering', icon: '📊', chapterId: 'data_ai', order: 10, aliases: [] },
    { id: 'data_management', label: 'Data Management', icon: '💾', chapterId: 'data_ai', order: 20, aliases: [] },
    { id: 'database_management', label: 'Database Management', icon: '🗄️', chapterId: 'data_ai', order: 30, aliases: [] },
    { id: 'ai_governance', label: 'AI Governance', icon: '🤖', chapterId: 'data_ai', order: 40, aliases: [] },
    { id: 'security', label: 'Security', icon: '🔒', chapterId: 'security_identity', order: 10, aliases: [] },
    { id: 'security_cross_platform', label: 'Security Cross-Platform', icon: '🛡️', chapterId: 'security_identity', order: 20, aliases: [] },
    { id: 'security_identity', label: 'Security & Identity', icon: '🪪', chapterId: 'security_identity', order: 30, aliases: [] },
    { id: 'data_protection', label: 'Data Protection', icon: '🛡️', chapterId: 'security_identity', order: 40, aliases: [] },
    { id: 'directory_services', label: 'Directory Services', icon: '📁', chapterId: 'security_identity', order: 50, aliases: [] },
    { id: 'client_platform', label: 'Client Platform', icon: '🖱️', chapterId: 'end_user_workplace', order: 10, aliases: [] },
    { id: 'endpoint_management', label: 'Endpoint Management', icon: '💻', chapterId: 'end_user_workplace', order: 20, aliases: [] },
    { id: 'modern_workplace', label: 'Modern Workplace', icon: '🖥️', chapterId: 'end_user_workplace', order: 30, aliases: [] },
    { id: 'service_desk', label: 'Service Desk', icon: '🎧', chapterId: 'end_user_workplace', order: 40, aliases: [] },
    { id: 'itsm_configuration', label: 'ITSM & Configuration', icon: '📋', chapterId: 'service_governance', order: 10, aliases: [] },
    { id: 'service_management', label: 'Service Management', icon: '🎯', chapterId: 'service_governance', order: 20, aliases: [] },
    { id: 'infrastructure_onboarding_cross_platform', label: 'Infrastructure Onboarding', icon: '🔌', chapterId: 'service_governance', order: 30, aliases: [] },
    { id: 'enterprise_architecture', label: 'Enterprise Architecture', icon: '🏛️', chapterId: 'service_governance', order: 40, aliases: [] },
    { id: 'c_suite', label: 'C-Suite', icon: '🏢', chapterId: 'leadership_chapter', order: 10, aliases: [] },
    { id: 'leadership', label: 'Leadership', icon: '👑', chapterId: 'leadership_chapter', order: 20, aliases: [] },
  ].map(domain => Object.freeze({
    ...domain,
    aliases: Object.freeze(domain.aliases.slice()),
  })));

  function validateCatalogueConfig({ chapters = CHAPTER_LIST, domains = DOMAIN_LIST } = {}) {
    if (!Array.isArray(chapters) || !Array.isArray(domains)) {
      return ['chapters and domains must be arrays'];
    }

    const errors = [];
    const chapterIds = new Set();
    const chapterOrders = new Set();
    for (const chapter of chapters) {
      if (!chapter || !chapter.id || !chapter.label || !chapter.icon || !chapter.description) {
        errors.push(`chapter ${chapter?.id || '<missing>'} is missing required fields`);
        continue;
      }
      if (chapterIds.has(chapter.id)) errors.push(`duplicate chapter ID "${chapter.id}"`);
      if (!Number.isInteger(chapter.order) || chapter.order <= 0) {
        errors.push(`chapter "${chapter.id}" has an invalid order`);
      } else if (chapterOrders.has(chapter.order)) {
        errors.push(`duplicate chapter order ${chapter.order}`);
      }
      if (chapter.chapterLeadRoleId !== null &&
          !/^[a-z0-9_]+\/[a-z0-9_]+$/.test(chapter.chapterLeadRoleId || '')) {
        errors.push(`chapter "${chapter.id}" has an invalid chapter lead role ID`);
      }
      if (chapter.id !== 'leadership_chapter' && chapter.chapterLeadRoleId === null) {
        errors.push(`chapter "${chapter.id}" is missing its chapter lead role ID`);
      }
      chapterIds.add(chapter.id);
      chapterOrders.add(chapter.order);
    }

    const domainIds = new Set();
    const claimedNames = new Map();
    const ordersByChapter = new Map();
    for (const domain of domains) {
      if (!domain) {
        errors.push('domain <missing> is missing required fields');
        continue;
      }
      if (!/^[a-z0-9_]+$/.test(domain.id || '')) {
        errors.push(`domain ID "${domain.id || '<missing>'}" must be lowercase`);
      }
      if (!domain.label || !domain.icon) {
        errors.push(`domain "${domain.id}" is missing required fields`);
      }
      if (domainIds.has(domain.id)) errors.push(`duplicate domain ID "${domain.id}"`);
      if (!chapterIds.has(domain.chapterId)) {
        errors.push(`domain "${domain.id}" references unknown chapter "${domain.chapterId}"`);
      }

      const orders = ordersByChapter.get(domain.chapterId) || new Set();
      if (!Number.isInteger(domain.order) || domain.order <= 0) {
        errors.push(`domain "${domain.id}" has an invalid order`);
      } else if (orders.has(domain.order)) {
        errors.push(`duplicate domain order ${domain.order} in "${domain.chapterId}"`);
      }
      orders.add(domain.order);
      ordersByChapter.set(domain.chapterId, orders);

      if (!Array.isArray(domain.aliases)) {
        errors.push(`domain "${domain.id}" aliases must be an array`);
      }
      const names = [domain.id, ...(Array.isArray(domain.aliases) ? domain.aliases : [])];
      for (const name of names) {
        if (typeof name !== 'string' || !name.trim()) {
          errors.push(`domain "${domain.id}" has an invalid alias`);
          continue;
        }
        const folded = name.toLowerCase();
        const owner = claimedNames.get(folded);
        if (owner && (owner !== domain.id || folded !== domain.id)) {
          errors.push(`domain alias "${name}" collides with "${owner}"`);
        }
        claimedNames.set(folded, domain.id);
      }
      domainIds.add(domain.id);
    }
    return errors;
  }

  function assertValidCatalogueConfig(config) {
    const errors = validateCatalogueConfig(config);
    if (errors.length) {
      throw new Error(`Invalid catalogue configuration:\n- ${errors.join('\n- ')}`);
    }
  }

  function resolveDomainId(value) {
    const key = String(value || '').trim().toLowerCase();
    const match = DOMAIN_LIST.find(domain =>
      domain.id === key || domain.aliases.some(alias => alias.toLowerCase() === key));
    return match ? match.id : null;
  }

  assertValidCatalogueConfig({ chapters: CHAPTER_LIST, domains: DOMAIN_LIST });

  const DOMAIN_LABELS = Object.freeze(Object.fromEntries(
    DOMAIN_LIST.map(domain => [domain.id, domain.label]),
  ));
  const ICONS = Object.freeze(Object.fromEntries(
    DOMAIN_LIST.map(domain => [domain.id, domain.icon]),
  ));
  const chapterEntries = CHAPTER_LIST
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(chapter => [
      chapter.id,
      Object.freeze({
        label: chapter.label,
        icon: chapter.icon,
        desc: chapter.description,
        domains: Object.freeze(DOMAIN_LIST
          .filter(domain => domain.chapterId === chapter.id)
          .sort((a, b) => a.order - b.order)
          .map(domain => domain.id)),
        leadFile: chapter.chapterLeadRoleId
          ? `Roles/${chapter.chapterLeadRoleId}.md`
          : null,
      }),
    ]);
  const CHAPTERS = Object.freeze(Object.fromEntries(chapterEntries));

  return Object.freeze({
    CHAPTER_LIST,
    DOMAIN_LIST,
    CHAPTERS,
    DOMAIN_LABELS,
    ICONS,
    resolveDomainId,
    validateCatalogueConfig,
    assertValidCatalogueConfig,
  });
}));
