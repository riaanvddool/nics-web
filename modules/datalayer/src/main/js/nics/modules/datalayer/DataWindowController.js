/*
 * Copyright (c) 2008-2015, Massachusetts Institute of Technology (MIT)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
define(['ext', "iweb/CoreModule", "./WindowController",
        './ImportWindow', './DatasourceImportPanel',
        './FileImportPanel', 'nics/modules/UserProfileModule',
        './WFSCapabilities', './WMSCapabilities',
        './KMLCapabilities', './KMZCapabilities'], 

	function(Ext, Core, WindowController, ImportWindow,
			DatasourceImportPanel, FileImportPanel, UserProfile, 
			WFSCapabilities, WMSCapabilities,
			KMLCapabilities, KMZCapabilities){
	
		return Ext.define('modules.datalayer.DataWindowController', {
			extend : 'modules.datalayer.WindowController',
			
			alias: 'controller.datalayer.datawindowcontroller',
			
			onImportClick: function() {
				if (!this.importWindow) {
					this.importWindow = this.createImportWindow();
				}
				this.importWindow.show();
			},
			
			createImportWindow: function() {
				var win = new ImportWindow();
				var tabPanel = win.getTabPanel();
				
				var kmlUrl = Ext.String.format("/em-api/v1/datalayer/{0}/sources/{1}/document/{2}",
						UserProfile.getWorkspaceId(),
						'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11',
						UserProfile.getUserOrgId());
				
				var kmzUrl = Ext.String.format("/em-api/v1/datalayer/{0}/sources/{1}/document/{2}",
						UserProfile.getWorkspaceId(),
						'79AB03BA-063C-A30B-AD2C-66A6E1CFAEA0',
						UserProfile.getUserOrgId());
				
				tabPanel.add([
					new DatasourceImportPanel({
						title: 'WFS',
						dataSourceType: 'wfs',
						capabilitiesFormat: new WFSCapabilities(),
						workspaceId: this.workspaceId
					}),
					new DatasourceImportPanel({
						title: 'WMS',
						dataSourceType: 'wms',
						capabilitiesFormat: new WMSCapabilities(),
						workspaceId: this.workspaceId
					}),
					new FileImportPanel({
						title: 'KMZ',
						dataSourceType: 'kmz',
						capabilitiesFormat: new KMLCapabilities(),
						workspaceId: this.workspaceId,
						url: kmzUrl
						
					}),
					new FileImportPanel({
						title: 'KML',
						dataSourceType: 'kml',
						capabilitiesFormat: new KMZCapabilities(),
						workspaceId: this.workspaceId,
						url: kmlUrl
					})
				]);
				tabPanel.setActiveTab(0);
				return win;
			}
		});
});
