import articleConfig from "./article";
import categoryConfig from "./category";
import commentConfig from "./comment";
import pageConfig from "./page";
import tocConfig from "./toc";
import viewCountConfig from "./viewCount";
import tagConfig from "./tag";
import delve from "dlv";

class Manager {
  constructor() {
    this.plugins = [];

    this.register(articleConfig);
    this.register(categoryConfig);
    this.register(commentConfig);
    this.register(pageConfig);
    this.register(tocConfig);
    this.register(viewCountConfig);
    this.register(tagConfig);
  }

  register(config) {
    this.plugins.push(config);
  }

  getAttaches(pluginId) {
    let result = [];
    this.plugins.map(plugin => {
      if (plugin.attach && plugin.attach[pluginId]) {
        result.push({ pluginId: plugin.id, attach: plugin.attach[pluginId] });
      }
    });
    return result;
  }
  getAttach(srcPluginId, destPluginId, destAttachId) {
    for (let plugin of this.plugins) {
      if (plugin.id === srcPluginId) {
        return delve(plugin, ["attach", destPluginId, destAttachId]);
      }
    }
  }
  getComponent(pluginId, componentSlug) {
    for (let plugin of this.plugins) {
      if (plugin.id === pluginId) {
        for (let component of plugin.components) {
          if (component.slug === componentSlug) {
            return component;
          }
        }
      }
    }
  }
}

const manager = new Manager();
export default manager;
