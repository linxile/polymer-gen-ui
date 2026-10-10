<template>
  <div class="app-container home">
    <!-- Hero 区域 -->
    <div class="hero-section">
      <el-row :gutter="40" class="hero-row">
        <el-col :xs="24" :sm="24" :lg="14" class="hero-left">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            基于 Spring Boot 2.7.18 + Vue 3 的代码生成器
          </div>
          <h1 class="hero-title">Polymer 代码生成器</h1>
          <p class="hero-desc">
            连接数据库，一键生成后端 CRUD 代码与前端页面，
            支持自定义模板、字段配置、批量生成与 ZIP 下载，
            让重复的增删改查开发变成几秒钟的事。
          </p>

          <!-- 技术标签 -->
          <div class="tech-tags">
            <el-tag size="small" type="primary" hit>Vue3</el-tag>
            <el-tag size="small" type="success" hit>Element-Plus</el-tag>
            <el-tag size="small" type="warning" hit>SpringBoot</el-tag>
            <el-tag size="small" type="danger" hit>MyBatis-Plus</el-tag>
            <el-tag size="small" type="primary" hit>Velocity</el-tag>
          </div>

          <div class="hero-actions">
            <el-button size="large" round plain>当前版本 v{{ version }}</el-button>
            <el-button
                type="primary"
                size="large"
                round
                @click="goTarget('https://github.com/linxile')"
            >
              <svg-icon size="20px" icon="icon-github-fill"></svg-icon>
              访问 GitHub
            </el-button>
            <el-button size="large" round plain @click="goGenerator">
              <el-icon><Edit /></el-icon>
              开始生成代码
            </el-button>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :lg="10" class="hero-right">
          <div class="stats-grid">
            <div class="stat-item" v-for="stat in stats" :key="stat.label">
              <div class="stat-icon-wrapper" :style="{ background: stat.colors.bg }">
                <el-icon :size="22" :color="stat.colors.icon">
                  <component :is="stat.iconComponent" />
                </el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number" :style="{ color: stat.colors.number }">
                  {{ stat.value }}
                </div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 功能特性区域 -->
    <div class="features-section">
      <div class="section-header">
        <span class="section-icon">✨</span>
        <h2 class="section-title">核心功能</h2>
        <span class="section-line"></span>
      </div>

      <el-row :gutter="16" class="features-grid">
        <el-col :xs="12" :sm="8" :md="6" v-for="feature in features" :key="feature.name">
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon :size="18"><component :is="feature.icon" /></el-icon>
            </div>
            <span class="feature-name">{{ feature.name }}</span>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 技术栈区域 -->
    <div class="tech-section">
      <div class="section-header">
        <span class="section-icon">🛠️</span>
        <h2 class="section-title">技术栈</h2>
        <span class="section-line"></span>
      </div>

      <el-row :gutter="24">
        <el-col :xs="24" :sm="12">
          <div class="tech-card">
            <div class="tech-card-header">
              <span class="tech-card-icon">☕</span>
              <h3>后端技术</h3>
            </div>
            <div class="tech-card-body">
              <span v-for="tech in backendTechs" :key="tech" class="tech-item">
                {{ tech }}
              </span>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12">
          <div class="tech-card">
            <div class="tech-card-header">
              <span class="tech-card-icon">🖥️</span>
              <h3>前端技术</h3>
            </div>
            <div class="tech-card-body">
              <span v-for="tech in frontendTechs" :key="tech" class="tech-item">
                {{ tech }}
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 底部 -->
    <div class="home-footer">
      <el-divider />
      <div class="footer-info">
        <span>© 2026 Polymer Generator</span>
        <span>❤️ 免费开源</span>
        <span>MIT License</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { markRaw } from 'vue'
import type { Component } from 'vue'
import { useRouter } from 'vue-router'
import {
  Clock,
  Coin,
  Connection,
  DataAnalysis,
  DataBoard,
  Document,
  Download,
  Edit,
  Files,
  Grid,
  MagicStick,
  Message,
  Operation,
  Setting,
  SuccessFilled,
  Tickets,
  Box,
  Collection
} from '@element-plus/icons-vue'
import appPackage from '../../package.json'

/** 统计项 */
interface StatItem {
  value: string
  label: string
  iconComponent: Component
  colors: {
    bg: string
    icon: string
    number: string
  }
}

/** 功能特性项 */
interface FeatureItem {
  name: string
  icon: Component
}

const router = useRouter()

/** 版本号 */
const version = appPackage.version

/** 统计数据 */
const stats: StatItem[] = [
  {
    value: '10+',
    label: '代码模板',
    iconComponent: markRaw(Files),
    colors: {
      bg: 'linear-gradient(135deg, #e8f5f9 0%, #d1ecf3 100%)',
      icon: '#2d8fa8',
      number: '#2d8fa8'
    }
  },
  {
    value: '1 键',
    label: '生成 CRUD',
    iconComponent: markRaw(MagicStick),
    colors: {
      bg: 'linear-gradient(135deg, #fef3e2 0%, #fce4c8 100%)',
      icon: '#e8962e',
      number: '#d4880f'
    }
  },
  {
    value: '100%',
    label: '开源免费',
    iconComponent: markRaw(SuccessFilled),
    colors: {
      bg: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
      icon: '#43a047',
      number: '#2e7d32'
    }
  },
  {
    value: '7x24',
    label: '稳定运行',
    iconComponent: markRaw(Clock),
    colors: {
      bg: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
      icon: '#e91e63',
      number: '#c2185b'
    }
  }
]

/** 核心功能特性 */
const features: FeatureItem[] = [
  { name: '表结构导入', icon: markRaw(Download) },
  { name: '字段配置', icon: markRaw(DataBoard) },
  { name: '模板管理', icon: markRaw(Files) },
  { name: '一键生成', icon: markRaw(MagicStick) },
  { name: '批量生成', icon: markRaw(Operation) },
  { name: 'ZIP 下载', icon: markRaw(Box) },
  { name: '代码预览', icon: markRaw(Document) },
  { name: '表结构同步', icon: markRaw(Connection) },
  { name: '多数据源', icon: markRaw(Coin) },
  { name: '自定义路径', icon: markRaw(Setting) },
  { name: '字段校验', icon: markRaw(Tickets) },
  { name: '多模板引擎', icon: markRaw(Collection) }
]

/** 后端技术栈 */
const backendTechs: string[] = [
  'Spring Boot 2.7.18',
  'MyBatis-Plus',
  'Velocity',
  'Druid',
  'Jackson',
  'dynamic-datasource',
  'MySQL / Oracle / PG',
  'Lombok',
  'Swagger / Knife4j'
]

/** 前端技术栈 */
const frontendTechs: string[] = [
  'Vue 3',
  'Element-Plus UI',
  'Axios',
  'Vue Router',
  'Pinia',
  'SCSS',
  'Vite'
]

/** 新窗口打开链接 */
function goTarget(href: string) {
  window.open(href, '_blank')
}

/** 跳转到代码生成页 */
function goGenerator() {
  router.push('/gen/generator/index')
}
</script>

<style scoped lang="scss">
// ========== 主题变量 ==========
$primary: #4fb5d0;
$primary-dark: #2d8fa8;
$primary-light: #7bc8dd;
$primary-lighter: #e8f5f9;
$text-primary: #1d2b3e;
$text-secondary: #5a6a7e;
$text-muted: #8a9aa8;
$bg-gray: #f5f7fa;
$card-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
$card-shadow-hover: 0 6px 20px rgba(0, 0, 0, 0.08);

.home {
  padding: 0;
  background: $bg-gray;
  min-height: calc(100vh - 120px);
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;

  > * {
    max-width: 100%;
    box-sizing: border-box;
  }

  // ========== 通用区块标题 ==========
  .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 8px 0 16px;

    .section-icon {
      font-size: 20px;
      flex-shrink: 0;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: $text-primary;
      margin: 0;
      white-space: nowrap;
    }
    .section-line {
      flex: 1;
      min-width: 20px;
      height: 1px;
      background: linear-gradient(to right, #e0e4ea, transparent);
      margin-left: 4px;
    }
  }

  // ========== Hero 区域 ==========
  .hero-section {
    background: #ffffff;
    padding: 36px 44px 28px;
    border-radius: 14px;
    box-shadow: $card-shadow;
    margin-bottom: 6px;
    overflow: hidden;
    box-sizing: border-box;

    .hero-row {
      align-items: center;
      margin-left: 0 !important;
      margin-right: 0 !important;

      > * {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }

      display: flex;
      flex-wrap: wrap;
      gap: 30px;

      .hero-left {
        flex: 1 1 55%;
        min-width: 280px;
      }
      .hero-right {
        flex: 1 1 35%;
        min-width: 220px;
      }
    }

    .hero-left {
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: $primary-lighter;
        color: $primary-dark;
        padding: 3px 14px;
        border-radius: 18px;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 14px;
        white-space: nowrap;

        .badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: $primary;
          animation: pulse-dot 2s infinite;
          flex-shrink: 0;
        }
      }

      .hero-title {
        font-size: 32px;
        font-weight: 700;
        color: $text-primary;
        margin: 0 0 10px 0;
        letter-spacing: -0.3px;
        word-break: break-word;
      }

      .hero-desc {
        font-size: 14px;
        color: $text-secondary;
        line-height: 1.8;
        max-width: 500px;
        margin: 0 0 18px 0;
        word-break: break-word;
      }

      .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 24px;

        .el-tag {
          border-radius: 6px;
          font-weight: 500;
          padding: 0 12px;
          height: 28px;
          line-height: 28px;
          flex-shrink: 0;
        }
      }

      .hero-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 14px;

        .el-button {
          font-weight: 500;
          font-size: 14px;
          flex-shrink: 0;

          &.el-button--primary {
            background: $primary;
            border-color: $primary;

            &:hover {
              background: $primary-light;
              border-color: $primary-light;
            }
          }

          &.is-plain {
            border-color: #d0d5dd;
            color: $text-secondary;

            &:hover {
              border-color: $primary;
              color: $primary;
              background: $primary-lighter;
            }
          }

          .el-icon {
            margin-right: 4px;
          }
        }
      }
    }

    .hero-right {
      .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        padding: 0;

        .stat-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #f0f2f5;
          cursor: default;

          &:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
            border-color: transparent;

            .stat-icon-wrapper {
              transform: scale(1.1) rotate(-8deg);
            }
          }

          .stat-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.3s ease;

            .el-icon {
              font-size: 22px;
            }
          }

          .stat-content {
            flex: 1;
            min-width: 0;

            .stat-number {
              font-size: 26px;
              font-weight: 700;
              line-height: 1.2;
              letter-spacing: -0.5px;
            }

            .stat-label {
              font-size: 13px;
              color: $text-secondary;
              font-weight: 500;
              margin-top: 2px;
            }
          }
        }
      }
    }
  }

  // ========== 功能特性区域 ==========
  .features-section {
    padding: 8px 0 4px;

    .features-grid {
      margin-top: 2px;
      margin-left: 0 !important;
      margin-right: 0 !important;

      > * {
        padding-left: 8px !important;
        padding-right: 8px !important;
      }
    }

    .feature-card {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #ffffff;
      padding: 12px 16px;
      border-radius: 10px;
      box-shadow: $card-shadow;
      transition: all 0.25s ease;
      cursor: default;
      border: 1px solid transparent;
      overflow: hidden;

      &:hover {
        transform: translateY(-2px);
        box-shadow: $card-shadow-hover;
        border-color: #eef1f5;
        background: #fafcfe;
      }

      .feature-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $primary-lighter;
        color: $primary;
        flex-shrink: 0;
        font-size: 16px;
        transition: all 0.2s;
      }

      &:hover .feature-icon {
        background: $primary;
        color: #fff;
      }

      .feature-name {
        font-size: 13px;
        font-weight: 500;
        color: $text-primary;
        white-space: nowrap;
      }
    }
  }

  // ========== 技术栈区域 ==========
  .tech-section {
    padding: 4px 0 0;

    .el-row {
      margin-left: 0 !important;
      margin-right: 0 !important;

      > * {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
    }

    .tech-card {
      background: #ffffff;
      border-radius: 14px;
      padding: 18px 22px 22px;
      box-shadow: $card-shadow;
      height: 100%;
      transition: box-shadow 0.2s;
      border: 1px solid transparent;
      overflow: hidden;

      &:hover {
        box-shadow: $card-shadow-hover;
        border-color: #eef1f5;
      }

      .tech-card-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f2f5;

        .tech-card-icon {
          font-size: 20px;
          flex-shrink: 0;
        }
        h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: $text-primary;
        }
      }

      .tech-card-body {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;

        .tech-item {
          background: #f5f7fa;
          color: $text-secondary;
          padding: 4px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
          cursor: default;
          white-space: nowrap;

          &:hover {
            background: $primary-lighter;
            color: $primary-dark;
          }
        }
      }
    }
  }

  // ========== 底部 ==========
  .home-footer {
    margin-top: 60px;
    padding-bottom: 6px;

    .el-divider {
      margin: 16px 0 12px;
    }

    .footer-info {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 18px;
      font-size: 12px;
      color: $text-muted;
    }
  }

  // ========== 动画 ==========
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.4); }
  }

  // ========== 响应式 ==========
  @media (max-width: 992px) {
    .hero-section {
      .hero-row {
        gap: 20px;
        .hero-left {
          flex: 1 1 100%;
        }
        .hero-right {
          flex: 1 1 100%;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .hero-section {
      padding: 20px 18px;

      .hero-left {
        .hero-title {
          font-size: 24px;
        }
        .hero-actions {
          flex-direction: column;
          align-items: stretch;
          .el-button {
            width: 100%;
            justify-content: center;
          }
        }
      }
      .hero-right .stats-grid {
        margin-top: 14px;
        padding: 14px;
      }
    }

    .features-section .feature-card {
      padding: 10px 14px;
      .feature-name {
        font-size: 12px;
      }
      .feature-icon {
        width: 28px;
        height: 28px;
        font-size: 14px;
      }
    }

    .tech-section .tech-card {
      padding: 14px 16px 18px;
      margin-bottom: 14px;
    }
  }

  @media (max-width: 576px) {
    .hero-section {
      padding: 16px 14px;
      .hero-left {
        .hero-title {
          font-size: 20px;
        }
        .hero-badge {
          font-size: 11px;
          padding: 2px 10px;
          white-space: normal;
        }
        .hero-actions {
          .el-button {
            font-size: 13px;
            padding: 10px 18px;
          }
        }
      }
      .hero-right .stats-grid {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        padding: 12px;
        .stat-item .stat-number {
          font-size: 20px;
        }
      }
    }

    .features-section {
      .features-grid > * {
        padding-left: 6px !important;
        padding-right: 6px !important;
      }
      .feature-card {
        padding: 8px 10px;
        .feature-name {
          font-size: 11px;
        }
        .feature-icon {
          width: 24px;
          height: 24px;
          font-size: 12px;
          border-radius: 6px;
        }
      }
    }

    .tech-section {
      .el-row > * {
        padding-left: 6px !important;
        padding-right: 6px !important;
      }
      .tech-card {
        padding: 12px 14px 16px;
        .tech-card-body .tech-item {
          font-size: 11px;
          padding: 3px 10px;
        }
      }
    }

    .section-header {
      .section-title {
        font-size: 15px;
        white-space: normal;
      }
      .section-line {
        min-width: 10px;
      }
    }

    .home-footer .footer-info {
      gap: 12px;
      font-size: 11px;
      flex-wrap: wrap;
    }
  }
}
</style>
